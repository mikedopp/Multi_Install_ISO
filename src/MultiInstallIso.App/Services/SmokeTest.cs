using System.Diagnostics;
using System.IO;
using System.Text.Json;
using Microsoft.Web.WebView2.Core;

namespace MultiInstallIso.App.Services;

/// <summary>
/// Offline self-check of the shipped build: UI assets, bundled engine, PowerShell, WebView2,
/// and a real plan + answer-media build + verification through the same engine path the
/// window uses. Run with: MultiInstallIso.exe --smoke [--out report.json]
/// </summary>
internal static class SmokeTest
{
    public static async Task<int> RunAsync(string? outPath)
    {
        var checks = new List<object>();
        var failures = 0;
        void Check(string name, bool ok, string detail)
        {
            checks.Add(new { name, status = ok ? "PASS" : "FAIL", detail });
            if (!ok) failures++;
        }

        var exe = Environment.ProcessPath ?? "";
        var fileVersion = File.Exists(exe) ? FileVersionInfo.GetVersionInfo(exe).ProductVersion ?? "" : "";
        Check("version", VersionInfo.Version.Length > 0 && fileVersion.StartsWith(VersionInfo.Version, StringComparison.Ordinal), $"app {VersionInfo.Version}, file {fileVersion}");

        foreach (var asset in new[] { "index.html", "styles.css", "app.js", @"glimmer\glimmer-badge.js", @"glimmer\glimmer-badge.css", @"glimmer\NOTICE.md" })
        {
            var p = Path.Combine(AppPaths.WebRoot, asset);
            Check($"asset {asset}", File.Exists(p) && new FileInfo(p).Length > 0, p);
        }
        foreach (var file in new[] { "Build-Cluster.ps1", @"powershell\MultiInstallIso\MultiInstallIso.psd1", @"guest\PostDeploy.ps1", "cluster-vms.yaml" })
        {
            var p = Path.Combine(AppPaths.EngineRoot, file);
            Check($"engine {file}", File.Exists(p), p);
        }

        string webView;
        try { webView = CoreWebView2Environment.GetAvailableBrowserVersionString(); } catch (Exception ex) { webView = ""; Check("webview2", false, ex.Message); }
        if (webView.Length > 0) Check("webview2", true, webView);

        var engine = new EngineRunner();
        Check("pwsh", engine.PwshPath is not null, engine.PwshPath ?? "not found");

        var temp = Path.Combine(Path.GetTempPath(), "mii-smoke-" + Guid.NewGuid().ToString("N")[..8]);
        try
        {
            if (engine.PwshPath is not null)
            {
                var deps = await engine.RunAsync("Dependencies", [("ArtifactRoot", temp)], timeout: TimeSpan.FromMinutes(1));
                var imapi = deps.Json is { } dj && dj.GetProperty("dependencies").EnumerateArray()
                    .Any(d => d.GetProperty("Name").GetString() == "IMAPI2FS (Windows)" && d.GetProperty("Status").GetString() == "OK");
                Check("engine dependencies", deps.Ok && imapi, deps.Ok ? "IMAPI2FS available" : deps.Error ?? "");

                var plan = await engine.RunAsync("Plan", [("DefinitionPath", AppPaths.SampleDefinition), ("ArtifactRoot", temp)], timeout: TimeSpan.FromMinutes(2));
                var planHash = plan.Json?.GetProperty("planHash").GetString() ?? "";
                var planPath = plan.Json?.GetProperty("planPath").GetString() ?? "";
                var vmCount = plan.Json?.GetProperty("plan").GetProperty("summary").GetProperty("vmCount").GetInt32() ?? 0;
                Check("engine plan", plan.Ok && planHash.Length == 64 && vmCount == 4, $"exit {plan.ExitCode}, {vmCount} VMs, hash {planHash}");

                if (plan.Ok)
                {
                    var secret = "smoke-" + Guid.NewGuid().ToString("N");
                    var creds = JsonSerializer.Serialize(new { adminUser = "Administrator", adminPassword = secret, domainUser = "CONTOSO\\join", domainPassword = secret });
                    var media = await engine.RunAsync("Media", [("PlanPath", planPath), ("PlanHash", planHash)], creds, TimeSpan.FromMinutes(5));
                    var count = media.Json is { } mj && mj.TryGetProperty("media", out var m) ? m.GetArrayLength() : 0;
                    var leaked = (media.Json?.GetRawText() ?? "").Contains(secret, StringComparison.Ordinal) || media.StdErr.Contains(secret, StringComparison.Ordinal);
                    Check("engine answer media", media.Ok && count == 4 && !leaked, media.Ok ? $"{count} ISOs built and read back; secret echoed: {leaked}" : media.Error ?? "");

                    var verify = await engine.RunAsync("VerifyMedia", [("PlanPath", planPath)], timeout: TimeSpan.FromMinutes(2));
                    Check("engine media verification", verify.Ok, verify.Ok ? "all PASS" : verify.Error ?? "");
                }
            }
        }
        finally
        {
            try { if (Directory.Exists(temp)) Directory.Delete(temp, true); } catch { }
        }

        var report = new
        {
            schema = "multi-install-iso.smoke.v1",
            app = AppPaths.AppName,
            version = VersionInfo.Version,
            exe,
            ranAt = DateTimeOffset.Now.ToString("O"),
            status = failures == 0 ? "PASS" : "FAIL",
            checks
        };
        var target = outPath ?? Path.Combine(AppPaths.LocalDir, "smoke-latest.json");
        Directory.CreateDirectory(Path.GetDirectoryName(Path.GetFullPath(target))!);
        File.WriteAllText(target, JsonSerializer.Serialize(report, new JsonSerializerOptions { WriteIndented = true }));
        AppLog.Info($"smoke {report.status}: {failures} failure(s), report {AppPaths.Redact(target)}");
        return failures == 0 ? 0 : 10 + failures;
    }
}
