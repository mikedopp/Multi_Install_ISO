using System.IO;
using System.Reflection;
using Microsoft.Win32;

namespace MultiInstallIso.App.Services;

/// <summary>Where the app keeps things, and the version it was built as.</summary>
internal static class AppPaths
{
    public const string AppName = "Multi Install ISO";
    public const string AppId = "MultiInstallIso";

    public static string DataDir { get; } = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), AppId);
    public static string LocalDir { get; } = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), AppId);
    public static string SettingsFile => Path.Combine(DataDir, "settings.json");
    public static string LogDir => Path.Combine(LocalDir, "logs");
    public static string LogFile => Path.Combine(LogDir, "app.log");
    public static string WebViewDataDir => Path.Combine(LocalDir, "WebView2");
    public static string DefaultArtifactRoot => Path.Combine(LocalDir, "artifacts");
    public static string WebRoot => Path.Combine(AppContext.BaseDirectory, "wwwroot");
    public static string EngineRoot => Path.Combine(AppContext.BaseDirectory, "engine");
    public static string EngineScript => Path.Combine(EngineRoot, "Build-Cluster.ps1");
    public static string SampleDefinition => Path.Combine(EngineRoot, "cluster-vms.yaml");

    /// <summary>True when <paramref name="path"/> is inside <paramref name="root"/>.</summary>
    public static bool IsUnder(string path, string root)
    {
        var full = Path.GetFullPath(path).TrimEnd('\\') + "\\";
        var parent = Path.GetFullPath(root).TrimEnd('\\') + "\\";
        return full.StartsWith(parent, StringComparison.OrdinalIgnoreCase);
    }

    /// <summary>Replaces the user profile path so diagnostics can be shared.</summary>
    public static string Redact(string text)
    {
        var profile = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        return string.IsNullOrEmpty(profile) ? text : text.Replace(profile, "%USERPROFILE%", StringComparison.OrdinalIgnoreCase);
    }
}

internal static class VersionInfo
{
    /// <summary>The product version stamped by the build (Directory.Build.props), never a literal.</summary>
    public static string Version { get; } = Read();

    public static string Display => "v" + Version;

    private static string Read()
    {
        var info = Assembly.GetExecutingAssembly().GetCustomAttribute<AssemblyInformationalVersionAttribute>()?.InformationalVersion;
        if (string.IsNullOrWhiteSpace(info)) info = Assembly.GetExecutingAssembly().GetName().Version?.ToString(3) ?? "0.0.0";
        var plus = info.IndexOf('+');
        return plus > 0 ? info[..plus] : info;
    }
}

/// <summary>Windows settings that decide whether glass may be shown.</summary>
internal static class SystemVisuals
{
    public static bool TransparencyEnabled
    {
        get
        {
            try
            {
                using var key = Registry.CurrentUser.OpenSubKey(@"Software\Microsoft\Windows\CurrentVersion\Themes\Personalize");
                return key?.GetValue("EnableTransparency") is not int value || value != 0;
            }
            catch
            {
                return true;
            }
        }
    }

    public static bool HighContrast => System.Windows.SystemParameters.HighContrast;

    public static bool ReducedMotion => !System.Windows.SystemParameters.ClientAreaAnimation;

    public static object Snapshot() => new
    {
        transparency = TransparencyEnabled,
        highContrast = HighContrast,
        reducedMotion = ReducedMotion
    };
}

internal static class AppLog
{
    private static readonly object Gate = new();

    public static void Info(string message) => Write("INFO", message);
    public static void Warn(string message) => Write("WARN", message);
    public static void Error(string message) => Write("ERROR", message);

    private static void Write(string level, string message)
    {
        try
        {
            lock (Gate)
            {
                Directory.CreateDirectory(AppPaths.LogDir);
                var file = new FileInfo(AppPaths.LogFile);
                if (file.Exists && file.Length > 1_000_000)
                {
                    var old = AppPaths.LogFile + ".1";
                    if (File.Exists(old)) File.Delete(old);
                    File.Move(AppPaths.LogFile, old);
                }
                File.AppendAllText(AppPaths.LogFile, $"{DateTimeOffset.Now:yyyy-MM-dd HH:mm:ss.fff zzz} {level} {message}{Environment.NewLine}");
            }
        }
        catch
        {
            // Logging must never take the app down.
        }
    }

    public static string[] Tail(int lines)
    {
        try
        {
            if (!File.Exists(AppPaths.LogFile)) return [];
            using var stream = new FileStream(AppPaths.LogFile, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            using var reader = new StreamReader(stream);
            var all = reader.ReadToEnd().Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
            return all.Skip(Math.Max(0, all.Length - lines)).Select(AppPaths.Redact).ToArray();
        }
        catch
        {
            return [];
        }
    }
}
