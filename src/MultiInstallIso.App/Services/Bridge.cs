using System.Diagnostics;
using System.IO;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.RegularExpressions;
using System.Windows;
using Microsoft.Web.WebView2.Core;
using Microsoft.Win32;

namespace MultiInstallIso.App.Services;

/// <summary>
/// Typed message bridge between the web UI and the host. Each action takes named values and
/// returns JSON; no action accepts command text, and every path is checked against the
/// folders the app owns.
/// </summary>
internal sealed partial class Bridge
{
    private readonly Window _owner;
    private readonly AppSettings _settings;
    private readonly EngineRunner _engine;
    private readonly Action _settingsChanged;
    private static readonly JsonSerializerOptions Json = new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

    public Bridge(Window owner, AppSettings settings, EngineRunner engine, Action settingsChanged)
    {
        _owner = owner;
        _settings = settings;
        _engine = engine;
        _settingsChanged = settingsChanged;
    }

    public async Task<string> HandleAsync(string message)
    {
        string? id = null;
        try
        {
            var request = JsonNode.Parse(message)!.AsObject();
            id = request["id"]?.GetValue<string>();
            var action = request["action"]?.GetValue<string>() ?? "";
            var args = request["args"] as JsonObject ?? new JsonObject();
            var data = await DispatchAsync(action, args);
            return JsonSerializer.Serialize(new { id, ok = true, data }, Json);
        }
        catch (Exception ex)
        {
            AppLog.Warn($"bridge error: {ex.Message}");
            return JsonSerializer.Serialize(new { id, ok = false, error = ex.Message }, Json);
        }
    }

    private Task<object?> DispatchAsync(string action, JsonObject a) => action switch
    {
        "init" => Task.FromResult<object?>(Init()),
        "saveSettings" => Task.FromResult<object?>(SaveSettings(a)),
        "resetGlass" => Task.FromResult<object?>(ResetGlass()),
        "loadDefinition" => Task.FromResult<object?>(LoadDefinition(Str(a, "path"))),
        "pickDefinition" => Task.FromResult<object?>(PickDefinition()),
        "saveDefinition" => Task.FromResult<object?>(SaveDefinition(Req(a, "path"), Req(a, "text"))),
        "saveDefinitionAs" => Task.FromResult<object?>(SaveDefinitionAs(Req(a, "text"), Str(a, "path"))),
        "plan" => PlanAsync(a),
        "listRuns" => Task.FromResult<object?>(ListRuns()),
        "openRun" => Task.FromResult<object?>(OpenRun(Req(a, "runDirectory"))),
        "buildMedia" => BuildMediaAsync(Req(a, "runDirectory"), Req(a, "planHash")),
        "verifyMedia" => VerifyMediaAsync(Req(a, "runDirectory")),
        "deleteMedia" => Task.FromResult<object?>(DeleteMedia(Req(a, "runDirectory"))),
        "pickIso" => Task.FromResult<object?>(PickIso()),
        "inspectIso" => InspectIsoAsync(a),
        "dependencies" => DependenciesAsync(),
        "applyCommand" => Task.FromResult<object?>(ApplyCommand(Req(a, "runDirectory"), Req(a, "planHash"))),
        "pickArtifactRoot" => Task.FromResult<object?>(PickArtifactRoot()),
        "openPath" => Task.FromResult<object?>(OpenPath(Req(a, "path"))),
        "openDoc" => Task.FromResult<object?>(OpenDoc(Req(a, "name"))),
        "copyText" => Task.FromResult<object?>(CopyText(Req(a, "text"))),
        "diagnostics" => Task.FromResult<object?>(Diagnostics()),
        _ => throw new InvalidOperationException($"Unknown action '{action}'.")
    };

    private static string? Str(JsonObject a, string name) => a[name]?.GetValue<string>();
    private static string Req(JsonObject a, string name) => Str(a, name) is { Length: > 0 } v ? v : throw new ArgumentException($"'{name}' is required.");

    // --- State and settings ---------------------------------------------------

    public object Init() => new
    {
        product = AppPaths.AppName,
        version = VersionInfo.Version,
        settings = _settings,
        artifactRoot = _settings.EffectiveArtifactRoot,
        engineRoot = AppPaths.EngineRoot,
        pwsh = _engine.PwshPath,
        visuals = SystemVisuals.Snapshot(),
        computerName = Environment.MachineName
    };

    private object SaveSettings(JsonObject a)
    {
        if (a["glassEnabled"] is { } g) _settings.GlassEnabled = g.GetValue<bool>();
        if (a["glassOpacity"] is { } o) _settings.GlassOpacity = o.GetValue<double>();
        if (a["glassBlur"] is { } b) _settings.GlassBlur = (int)Math.Round(b.GetValue<double>());
        if (a["closeToTray"] is { } c) _settings.CloseToTray = c.GetValue<bool>();
        if (a["target"] is { } t) _settings.Target = t.GetValue<string>();
        if (a.ContainsKey("vcenterServer")) _settings.VcenterServer = Clean(Str(a, "vcenterServer"));
        if (a.ContainsKey("vcenterCluster")) _settings.VcenterCluster = Clean(Str(a, "vcenterCluster"));
        SettingsStore.Save(_settings);
        _settingsChanged();
        return _settings;
    }

    private static string? Clean(string? s) => string.IsNullOrWhiteSpace(s) ? null : s.Trim();

    private object ResetGlass()
    {
        _settings.ResetGlass();
        SettingsStore.Save(_settings);
        _settingsChanged();
        return _settings;
    }

    private object? PickArtifactRoot()
    {
        var dialog = new OpenFolderDialog { Title = "Folder for plans, answer media, and receipts", InitialDirectory = _settings.EffectiveArtifactRoot };
        if (dialog.ShowDialog(_owner) != true) return null;
        _settings.ArtifactRoot = dialog.FolderName;
        SettingsStore.Save(_settings);
        return _settings;
    }

    // --- Definitions ----------------------------------------------------------

    private static readonly string[] DefinitionExtensions = [".yaml", ".yml", ".json", ".csv"];

    private object LoadDefinition(string? path)
    {
        path ??= _settings.DefinitionPath;
        if (string.IsNullOrWhiteSpace(path) || !File.Exists(path)) path = AppPaths.SampleDefinition;
        if (!DefinitionExtensions.Contains(Path.GetExtension(path).ToLowerInvariant())) throw new InvalidOperationException("Definitions are .yaml, .yml, .json, or .csv files.");
        return DefinitionInfo(path);
    }

    private static object DefinitionInfo(string path) => new
    {
        path,
        text = File.ReadAllText(path),
        isSample = AppPaths.IsUnder(path, AppPaths.EngineRoot),
        modified = File.GetLastWriteTime(path)
    };

    private object? PickDefinition()
    {
        var dialog = new OpenFileDialog
        {
            Title = "Open a VM definition",
            Filter = "VM definitions (*.yaml;*.yml;*.json;*.csv)|*.yaml;*.yml;*.json;*.csv",
            InitialDirectory = Path.GetDirectoryName(_settings.DefinitionPath) is { } d && Directory.Exists(d) ? d : Path.Combine(AppPaths.EngineRoot, "examples")
        };
        if (dialog.ShowDialog(_owner) != true) return null;
        _settings.DefinitionPath = dialog.FileName;
        SettingsStore.Save(_settings);
        return DefinitionInfo(dialog.FileName);
    }

    private object SaveDefinition(string path, string text)
    {
        if (AppPaths.IsUnder(path, AppPaths.EngineRoot)) throw new InvalidOperationException("Bundled samples are read-only. Use Save As.");
        if (!string.Equals(Path.GetFullPath(path), Path.GetFullPath(_settings.DefinitionPath ?? ""), StringComparison.OrdinalIgnoreCase))
            throw new InvalidOperationException("Only the open definition can be saved in place. Use Save As.");
        File.WriteAllText(path, text);
        AppLog.Info($"definition saved: {AppPaths.Redact(path)}");
        return DefinitionInfo(path);
    }

    private object? SaveDefinitionAs(string text, string? currentPath)
    {
        var ext = Path.GetExtension(currentPath ?? "x.yaml");
        var dialog = new SaveFileDialog
        {
            Title = "Save VM definition",
            Filter = "YAML (*.yaml)|*.yaml|JSON (*.json)|*.json|CSV (*.csv)|*.csv",
            FilterIndex = ext.Equals(".json", StringComparison.OrdinalIgnoreCase) ? 2 : ext.Equals(".csv", StringComparison.OrdinalIgnoreCase) ? 3 : 1,
            FileName = Path.GetFileName(currentPath ?? "cluster-vms.yaml"),
            InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)
        };
        if (dialog.ShowDialog(_owner) != true) return null;
        if (AppPaths.IsUnder(dialog.FileName, AppPaths.EngineRoot)) throw new InvalidOperationException("Save outside the app folder.");
        File.WriteAllText(dialog.FileName, text);
        _settings.DefinitionPath = dialog.FileName;
        SettingsStore.Save(_settings);
        return DefinitionInfo(dialog.FileName);
    }

    // --- Plans and runs -------------------------------------------------------

    private async Task<object?> PlanAsync(JsonObject a)
    {
        var path = Req(a, "path");
        if (!File.Exists(path)) throw new FileNotFoundException("Definition not found.", path);
        var target = Str(a, "target") is "hyperv" ? "hyperv" : "vsphere";
        var p = new List<(string, string?)>
        {
            ("DefinitionPath", path),
            ("ArtifactRoot", _settings.EffectiveArtifactRoot),
            ("Target", target)
        };
        if (Clean(Str(a, "vcenterServer")) is { } vc) p.Add(("VcenterServer", vc));
        if (Clean(Str(a, "vcenterCluster")) is { } cl) p.Add(("VcenterCluster", cl));
        var result = await _engine.RunAsync("Plan", p, timeout: TimeSpan.FromMinutes(2));
        if (result.Json is not { } json || json.TryGetProperty("error", out _)) throw new InvalidOperationException(result.Error ?? "Planning failed.");
        _settings.LastRunDirectory = json.GetProperty("runDirectory").GetString();
        _settings.DefinitionPath = path;
        SettingsStore.Save(_settings);
        return json;
    }

    private string CheckRun(string runDirectory)
    {
        var full = Path.GetFullPath(runDirectory);
        if (!AppPaths.IsUnder(full, _settings.EffectiveArtifactRoot)) throw new InvalidOperationException("That run is outside the artifact folder.");
        if (!File.Exists(Path.Combine(full, "build-plan.json"))) throw new FileNotFoundException("No build-plan.json in that run.");
        return full;
    }

    private object ListRuns()
    {
        var root = _settings.EffectiveArtifactRoot;
        if (!Directory.Exists(root)) return new { root, runs = Array.Empty<object>() };
        var runs = new List<object>();
        foreach (var dir in Directory.EnumerateDirectories(root).OrderByDescending(d => d, StringComparer.Ordinal).Take(100))
        {
            var planFile = Path.Combine(dir, "build-plan.json");
            if (!File.Exists(planFile)) continue;
            try
            {
                using var doc = JsonDocument.Parse(File.ReadAllText(planFile));
                var plan = doc.RootElement;
                var summary = plan.GetProperty("summary");
                var mediaManifest = Path.Combine(dir, "media", "media-manifest.json");
                var applies = Directory.EnumerateDirectories(dir, "apply-*").OrderByDescending(d => d).Select(d =>
                {
                    var s = Path.Combine(d, "run-summary.json");
                    string status = "INCOMPLETE";
                    if (File.Exists(s)) { using var sd = JsonDocument.Parse(File.ReadAllText(s)); status = sd.RootElement.GetProperty("status").GetString() ?? "UNKNOWN"; }
                    return new { folder = Path.GetFileName(d), status };
                }).ToArray();
                runs.Add(new
                {
                    runDirectory = dir,
                    name = Path.GetFileName(dir),
                    generatedAt = plan.GetProperty("generatedAt").GetString(),
                    definition = plan.GetProperty("definition").GetProperty("path").GetString(),
                    target = plan.GetProperty("target").GetProperty("kind").GetString(),
                    vmCount = summary.GetProperty("vmCount").GetInt32(),
                    ready = summary.GetProperty("ready").GetBoolean(),
                    blocking = summary.GetProperty("blockingIssues").GetInt32(),
                    media = File.Exists(mediaManifest),
                    mediaCount = Directory.Exists(Path.Combine(dir, "media")) ? Directory.EnumerateFiles(Path.Combine(dir, "media"), "*-answer.iso").Count() : 0,
                    applies
                });
            }
            catch (Exception ex)
            {
                runs.Add(new { runDirectory = dir, name = Path.GetFileName(dir), error = ex.Message });
            }
        }
        return new { root, runs };
    }

    private object OpenRun(string runDirectory)
    {
        var dir = CheckRun(runDirectory);
        var planText = File.ReadAllText(Path.Combine(dir, "build-plan.json"));
        var hashFile = Path.Combine(dir, "build-plan.sha256");
        var recorded = File.Exists(hashFile) ? File.ReadAllText(hashFile).Split(' ', StringSplitOptions.RemoveEmptyEntries)[0].Trim() : null;
        string actual;
        using (var stream = File.OpenRead(Path.Combine(dir, "build-plan.json")))
            actual = Convert.ToHexStringLower(System.Security.Cryptography.SHA256.HashData(stream));
        var manifestFile = Path.Combine(dir, "media", "media-manifest.json");
        _settings.LastRunDirectory = dir;
        SettingsStore.Save(_settings);
        return new
        {
            runDirectory = dir,
            planHash = actual,
            hashMatchesRecord = recorded is null ? (bool?)null : string.Equals(recorded, actual, StringComparison.OrdinalIgnoreCase),
            plan = JsonDocument.Parse(planText).RootElement.Clone(),
            media = File.Exists(manifestFile) ? JsonDocument.Parse(File.ReadAllText(manifestFile)).RootElement.Clone() : (JsonElement?)null
        };
    }

    // --- Answer media ---------------------------------------------------------

    private async Task<object?> BuildMediaAsync(string runDirectory, string planHash)
    {
        var dir = CheckRun(runDirectory);
        using var planDoc = JsonDocument.Parse(File.ReadAllText(Path.Combine(dir, "build-plan.json")));
        var vms = planDoc.RootElement.GetProperty("vms").EnumerateArray().ToArray();
        var needWindows = vms.Any(v => v.GetProperty("osFamily").GetString() == "windows");
        var needLinux = vms.Any(v => v.GetProperty("osFamily").GetString() == "linux");
        var domains = vms.Where(v => v.GetProperty("osFamily").GetString() == "windows" && v.GetProperty("domain").GetString() is { Length: > 0 })
            .Select(v => v.GetProperty("domain").GetString()!).Distinct().ToArray();

        // Only VMs without an answer ISO are built; the engine never overwrites media.
        var missing = vms.Select(v => v.GetProperty("name").GetString()!)
            .Where(n => !File.Exists(Path.Combine(dir, "media", n + "-answer.iso"))).ToArray();
        if (missing.Length == 0) throw new InvalidOperationException("Every VM already has answer media. Delete it first to rebuild.");
        var targets = vms.Where(v => missing.Contains(v.GetProperty("name").GetString())).ToArray();
        needWindows = targets.Any(v => v.GetProperty("osFamily").GetString() == "windows");
        needLinux = targets.Any(v => v.GetProperty("osFamily").GetString() == "linux");

        var dialog = new CredentialWindow(needWindows, needLinux, domains, missing.Length) { Owner = _owner };
        if (dialog.ShowDialog() != true) return new { canceled = true };
        var payload = dialog.TakePayloadJson();

        var args = new List<(string, string?)> { ("PlanPath", Path.Combine(dir, "build-plan.json")), ("PlanHash", planHash) };
        if (missing.Length < vms.Length) args.Add(("VmName", string.Join(',', missing)));
        var result = await _engine.RunAsync("Media", args, payload, TimeSpan.FromMinutes(10));
        payload = null;
        if (result.Json is not { } json || json.TryGetProperty("error", out _)) throw new InvalidOperationException(result.Error ?? "Building answer media failed.");
        return json;
    }

    private async Task<object?> VerifyMediaAsync(string runDirectory)
    {
        var dir = CheckRun(runDirectory);
        var result = await _engine.RunAsync("VerifyMedia", [("PlanPath", Path.Combine(dir, "build-plan.json"))], timeout: TimeSpan.FromMinutes(5));
        if (result.Json is not { } json || json.TryGetProperty("error", out _)) throw new InvalidOperationException(result.Error ?? "Verification failed.");
        return json;
    }

    private object DeleteMedia(string runDirectory)
    {
        var dir = CheckRun(runDirectory);
        var media = Path.Combine(dir, "media");
        var files = Directory.Exists(media) ? Directory.GetFiles(media, "*-answer.iso") : [];
        if (files.Length == 0) return new { deleted = 0 };
        var answer = MessageBox.Show(_owner, $"Delete {files.Length} answer-media ISO file(s)? They contain credentials and cannot be recovered.\n\n{media}",
            AppPaths.AppName, MessageBoxButton.OKCancel, MessageBoxImage.Warning, MessageBoxResult.Cancel);
        if (answer != MessageBoxResult.OK) return new { deleted = 0, canceled = true };
        foreach (var f in files) File.Delete(f);
        AppLog.Info($"answer media deleted: {files.Length} file(s) in {AppPaths.Redact(media)}");
        return new { deleted = files.Length };
    }

    // --- Install media --------------------------------------------------------

    private object? PickIso()
    {
        var dialog = new OpenFileDialog { Title = "Choose an install ISO", Filter = "ISO images (*.iso)|*.iso" };
        return dialog.ShowDialog(_owner) == true ? new { path = dialog.FileName, bytes = new FileInfo(dialog.FileName).Length } : null;
    }

    [GeneratedRegex("^[0-9a-fA-F]{64}$")]
    private static partial Regex Sha256Pattern();

    private async Task<object?> InspectIsoAsync(JsonObject a)
    {
        var path = Req(a, "path");
        if (!File.Exists(path) || !path.EndsWith(".iso", StringComparison.OrdinalIgnoreCase)) throw new FileNotFoundException("Choose an existing .iso file.", path);
        var p = new List<(string, string?)> { ("IsoPath", path) };
        if (Clean(Str(a, "expectedSha256")) is { } sha)
        {
            if (!Sha256Pattern().IsMatch(sha)) throw new ArgumentException("Expected SHA-256 must be 64 hexadecimal characters.");
            p.Add(("ExpectedSha256", sha));
        }
        if (Clean(Str(a, "imageName")) is { } image) p.Add(("ImageName", image));
        if (a["skipHash"]?.GetValue<bool>() == true) p.Add(("SkipHash", null));
        var result = await _engine.RunAsync("InspectIso", p, timeout: TimeSpan.FromMinutes(30));
        if (result.Json is not { } json || json.TryGetProperty("error", out _)) throw new InvalidOperationException(result.Error ?? "Inspection failed.");
        return json;
    }

    // --- Dependencies and apply ----------------------------------------------

    private async Task<object?> DependenciesAsync()
    {
        var result = await _engine.RunAsync("Dependencies", [("ArtifactRoot", _settings.EffectiveArtifactRoot)], timeout: TimeSpan.FromMinutes(1));
        string webView;
        try { webView = CoreWebView2Environment.GetAvailableBrowserVersionString(); } catch { webView = ""; }
        var glimmer = Path.Combine(AppPaths.WebRoot, "glimmer", "VERSION.txt");
        var app = new object[]
        {
            new { name = "WebView2 Runtime", kind = "runtime", requiredFor = "the app window", status = webView.Length > 0 ? "OK" : "MISSING", location = "Microsoft Edge WebView2", detail = webView },
            new { name = "PowerShell 7 for the engine", kind = "runtime", requiredFor = "every engine action", status = _engine.PwshPath is null ? "MISSING" : "OK", location = _engine.PwshPath ?? "https://aka.ms/powershell", detail = "" },
            new { name = "Engine scripts", kind = "path", requiredFor = "every engine action", status = File.Exists(AppPaths.EngineScript) ? "OK" : "MISSING", location = AppPaths.EngineRoot, detail = "Shipped with the app." },
            new { name = "Glimmer badge kit", kind = "path", requiredFor = "version orb", status = File.Exists(glimmer) ? "OK" : "MISSING", location = Path.Combine(AppPaths.WebRoot, "glimmer"), detail = File.Exists(glimmer) ? File.ReadLines(glimmer).FirstOrDefault() ?? "" : "" },
            new { name = "Settings", kind = "path", requiredFor = "saved preferences", status = File.Exists(AppPaths.SettingsFile) ? "OK" : "CREATED ON USE", location = AppPaths.SettingsFile, detail = "" },
            new { name = "App log", kind = "path", requiredFor = "diagnostics", status = "OK", location = AppPaths.LogFile, detail = "Never contains credentials." },
            new { name = "WebView2 profile", kind = "path", requiredFor = "the app window", status = "OK", location = AppPaths.WebViewDataDir, detail = "" }
        };
        return new
        {
            app,
            engine = result.Json is { } j && j.TryGetProperty("dependencies", out var deps) ? deps : (JsonElement?)null,
            engineError = result.Ok ? null : result.Error
        };
    }

    private object ApplyCommand(string runDirectory, string planHash)
    {
        var dir = CheckRun(runDirectory);
        using var planDoc = JsonDocument.Parse(File.ReadAllText(Path.Combine(dir, "build-plan.json")));
        var target = planDoc.RootElement.GetProperty("target");
        var kind = target.GetProperty("kind").GetString();
        var vcenter = target.GetProperty("vcenterServer").GetString();
        var plan = Path.Combine(dir, "build-plan.json");
        var script = AppPaths.EngineScript;
        string command, confirm, note;
        if (kind == "hyperv")
        {
            confirm = Environment.MachineName;
            command = $"pwsh -NoProfile -File \"{script}\" -Mode Apply -PlanPath \"{plan}\" -PlanHash {planHash} -ConfirmTarget {confirm}";
            note = "Run from an elevated PowerShell 7 window. Hyper-V must be enabled.";
        }
        else
        {
            confirm = string.IsNullOrWhiteSpace(vcenter) ? "<vcenter-server>" : vcenter!;
            command = $"pwsh -NoProfile -File \"{script}\" -Mode Apply -PlanPath \"{plan}\" -PlanHash {planHash} -ConfirmTarget {confirm} -VcenterCredential (Get-Credential)";
            note = string.IsNullOrWhiteSpace(vcenter) ? "This plan has no vCenter server. Plan again with the server filled in." : "Needs VMware PowerCLI. PowerShell asks you to confirm before anything is created.";
        }
        return new { target = kind, confirmTarget = confirm, command, note };
    }

    // --- Shell helpers --------------------------------------------------------

    private object OpenPath(string path)
    {
        var full = Path.GetFullPath(path);
        var allowed = new[] { _settings.EffectiveArtifactRoot, AppPaths.EngineRoot, AppPaths.DataDir, AppPaths.LocalDir };
        if (!allowed.Any(r => AppPaths.IsUnder(full, r) || string.Equals(full.TrimEnd('\\'), Path.GetFullPath(r).TrimEnd('\\'), StringComparison.OrdinalIgnoreCase)))
            throw new InvalidOperationException("That path is outside the folders this app manages.");
        if (Directory.Exists(full)) Process.Start(new ProcessStartInfo("explorer.exe", $"\"{full}\"") { UseShellExecute = true });
        else if (File.Exists(full)) Process.Start(new ProcessStartInfo("explorer.exe", $"/select,\"{full}\"") { UseShellExecute = true });
        else throw new FileNotFoundException("Path not found.", full);
        return new { opened = full };
    }

    private static readonly string[] Docs = ["RUNBOOK", "PREREQUISITES", "DEFINITION_AUTHORING", "EVALUATION", "IMPLEMENTATION_PLAN"];

    private static object OpenDoc(string name)
    {
        if (!Docs.Contains(name)) throw new ArgumentException("Unknown document.");
        var path = Path.Combine(AppPaths.EngineRoot, "docs", name + ".md");
        if (!File.Exists(path)) throw new FileNotFoundException("Document not found.", path);
        Process.Start(new ProcessStartInfo(path) { UseShellExecute = true });
        return new { opened = path };
    }

    private static object CopyText(string text)
    {
        Clipboard.SetText(text);
        return new { copied = text.Length };
    }

    private object Diagnostics()
    {
        string webView;
        try { webView = CoreWebView2Environment.GetAvailableBrowserVersionString(); } catch { webView = "missing"; }
        var lines = new List<string>
        {
            $"{AppPaths.AppName} {VersionInfo.Display}",
            $"OS: {Environment.OSVersion.VersionString}",
            $".NET: {Environment.Version}",
            $"WebView2: {webView}",
            $"pwsh: {_engine.PwshPath ?? "missing"}",
            $"Engine: {AppPaths.EngineRoot}",
            $"Artifacts: {_settings.EffectiveArtifactRoot}",
            $"Glass: enabled={_settings.GlassEnabled} opacity={_settings.GlassOpacity:0.00} blur={_settings.GlassBlur}px; system transparency={SystemVisuals.TransparencyEnabled} highContrast={SystemVisuals.HighContrast}",
            $"Close to tray: {_settings.CloseToTray}",
            "",
            "Recent log:"
        };
        lines.AddRange(AppLog.Tail(40));
        return new { text = AppPaths.Redact(string.Join(Environment.NewLine, lines)) };
    }
}
