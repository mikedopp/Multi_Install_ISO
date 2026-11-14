using System.Diagnostics;
using System.IO;
using System.Text;
using System.Text.Json;

namespace MultiInstallIso.App.Services;

internal sealed record EngineResult(int ExitCode, JsonElement? Json, string StdErr, TimeSpan Duration, bool TimedOut)
{
    public bool Ok => ExitCode == 0 && Json is not null;

    public string? Error =>
        Json is { } j && j.TryGetProperty("error", out var e) ? e.GetString()
        : TimedOut ? "The engine timed out."
        : Json is null ? FirstLine(StdErr) ?? $"The engine exited with code {ExitCode} and no result."
        : null;

    private static string? FirstLine(string text) =>
        text.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).FirstOrDefault();
}

/// <summary>
/// Runs Build-Cluster.ps1 in PowerShell 7 with a fixed argument list. The UI never builds
/// command text; it picks a mode and typed values. Secrets travel on stdin only and are
/// never logged.
/// </summary>
internal sealed class EngineRunner
{
    public string? PwshPath { get; } = FindPwsh();

    public static string? FindPwsh()
    {
        foreach (var dir in (Environment.GetEnvironmentVariable("PATH") ?? "").Split(';', StringSplitOptions.RemoveEmptyEntries))
        {
            try
            {
                var candidate = Path.Combine(dir.Trim(), "pwsh.exe");
                if (File.Exists(candidate)) return candidate;
            }
            catch { }
        }
        var programFiles = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
        foreach (var folder in new[] { "7", "7-preview" })
        {
            var candidate = Path.Combine(programFiles, "PowerShell", folder, "pwsh.exe");
            if (File.Exists(candidate)) return candidate;
        }
        return null;
    }

    public async Task<EngineResult> RunAsync(string mode, IReadOnlyList<(string Name, string? Value)> parameters, string? stdinJson = null, TimeSpan? timeout = null, CancellationToken cancel = default)
    {
        if (PwshPath is null) return new EngineResult(-1, null, "PowerShell 7 (pwsh.exe) was not found. Install it from https://aka.ms/powershell.", TimeSpan.Zero, false);
        if (!File.Exists(AppPaths.EngineScript)) return new EngineResult(-1, null, $"Engine script missing: {AppPaths.EngineScript}", TimeSpan.Zero, false);

        var psi = new ProcessStartInfo(PwshPath)
        {
            UseShellExecute = false,
            CreateNoWindow = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            RedirectStandardInput = true,
            StandardOutputEncoding = Encoding.UTF8,
            StandardErrorEncoding = Encoding.UTF8,
            WorkingDirectory = AppPaths.EngineRoot
        };
        foreach (var a in new[] { "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File", AppPaths.EngineScript, "-Mode", mode })
            psi.ArgumentList.Add(a);
        foreach (var (name, value) in parameters)
        {
            psi.ArgumentList.Add("-" + name);
            if (value is not null) psi.ArgumentList.Add(value);
        }
        if (stdinJson is not null) psi.ArgumentList.Add("-CredentialsFromStdin");
        psi.ArgumentList.Add("-Json");

        var logged = string.Join(' ', parameters.Select(p => p.Value is null ? "-" + p.Name : $"-{p.Name} \"{p.Value}\""));
        AppLog.Info($"engine start: {mode} {AppPaths.Redact(logged)}{(stdinJson is null ? "" : " (+ credentials on stdin)")}");

        var watch = Stopwatch.StartNew();
        using var process = new Process { StartInfo = psi };
        process.Start();
        var stdout = process.StandardOutput.ReadToEndAsync(cancel);
        var stderr = process.StandardError.ReadToEndAsync(cancel);
        if (stdinJson is not null) await process.StandardInput.WriteLineAsync(stdinJson.AsMemory(), cancel);
        process.StandardInput.Close();

        var timedOut = false;
        using (var limit = CancellationTokenSource.CreateLinkedTokenSource(cancel))
        {
            limit.CancelAfter(timeout ?? TimeSpan.FromMinutes(10));
            try { await process.WaitForExitAsync(limit.Token); }
            catch (OperationCanceledException)
            {
                timedOut = !cancel.IsCancellationRequested;
                try { process.Kill(entireProcessTree: true); } catch { }
            }
        }

        var outText = await stdout;
        var errText = await stderr;
        JsonElement? json = null;
        var line = outText.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).LastOrDefault(l => l.StartsWith('{'));
        if (line is not null)
        {
            try { json = JsonDocument.Parse(line).RootElement.Clone(); }
            catch (JsonException ex) { AppLog.Warn($"engine output was not JSON: {ex.Message}"); }
        }
        var exit = process.HasExited ? process.ExitCode : -1;
        AppLog.Info($"engine end: {mode} exit={exit} {watch.ElapsedMilliseconds} ms{(timedOut ? " TIMED OUT" : "")}{(errText.Length > 0 ? " stderr=" + AppPaths.Redact(errText.Length > 400 ? errText[..400] : errText).ReplaceLineEndings(" ") : "")}");
        return new EngineResult(exit, json, errText, watch.Elapsed, timedOut);
    }
}
