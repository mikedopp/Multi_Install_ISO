using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MultiInstallIso.App.Services;

internal sealed class AppSettings
{
    public const double DefaultGlassOpacity = 0.55;
    public const int DefaultGlassBlur = 18;

    public bool GlassEnabled { get; set; } = true;
    public double GlassOpacity { get; set; } = DefaultGlassOpacity;
    public int GlassBlur { get; set; } = DefaultGlassBlur;
    public bool CloseToTray { get; set; } = true;
    public bool CloseToTrayExplained { get; set; }
    public string? ArtifactRoot { get; set; }
    public string? DefinitionPath { get; set; }
    public string Target { get; set; } = "vsphere";
    public string? VcenterServer { get; set; }
    public string? VcenterCluster { get; set; }
    public string? LastRunDirectory { get; set; }

    [JsonIgnore]
    public string EffectiveArtifactRoot => string.IsNullOrWhiteSpace(ArtifactRoot) ? AppPaths.DefaultArtifactRoot : ArtifactRoot!;

    public void Normalize()
    {
        GlassOpacity = Math.Clamp(double.IsFinite(GlassOpacity) ? GlassOpacity : DefaultGlassOpacity, 0.2, 0.95);
        GlassBlur = Math.Clamp(GlassBlur, 0, 40);
        if (Target is not ("vsphere" or "hyperv")) Target = "vsphere";
    }

    public void ResetGlass()
    {
        GlassEnabled = true;
        GlassOpacity = DefaultGlassOpacity;
        GlassBlur = DefaultGlassBlur;
    }
}

internal static class SettingsStore
{
    private static readonly JsonSerializerOptions Options = new() { WriteIndented = true, PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

    public static AppSettings Load()
    {
        try
        {
            if (File.Exists(AppPaths.SettingsFile))
            {
                var settings = JsonSerializer.Deserialize<AppSettings>(File.ReadAllText(AppPaths.SettingsFile), Options) ?? new AppSettings();
                settings.Normalize();
                return settings;
            }
        }
        catch (Exception ex)
        {
            AppLog.Warn($"Settings could not be read and were reset: {ex.Message}");
            try { File.Copy(AppPaths.SettingsFile, AppPaths.SettingsFile + ".bad", true); } catch { }
        }
        return new AppSettings();
    }

    public static void Save(AppSettings settings)
    {
        settings.Normalize();
        Directory.CreateDirectory(AppPaths.DataDir);
        var temp = AppPaths.SettingsFile + ".tmp";
        File.WriteAllText(temp, JsonSerializer.Serialize(settings, Options));
        File.Move(temp, AppPaths.SettingsFile, true);
    }
}
