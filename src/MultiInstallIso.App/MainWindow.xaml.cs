using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Text.Json;
using System.Windows;
using Microsoft.Web.WebView2.Core;
using Microsoft.Win32;
using MultiInstallIso.App.Services;

namespace MultiInstallIso.App;

internal sealed record SnapshotRequest(string Path, bool Glass, string View);

public partial class MainWindow : Window
{
    private const string Origin = "https://app.mii/";
    private readonly AppSettings _settings = SettingsStore.Load();
    private readonly EngineRunner _engine = new();
    private readonly SnapshotRequest? _snapshot;
    private Bridge? _bridge;
    private TrayIcon? _tray;
    private bool _exitRequested;

    internal MainWindow(SnapshotRequest? snapshot)
    {
        _snapshot = snapshot;
        InitializeComponent();
        Title = $"{AppPaths.AppName} {VersionInfo.Display}";
        Web.DefaultBackgroundColor = System.Drawing.Color.FromArgb(255, 14, 20, 32);
        _bridge = new Bridge(this, _settings, _engine, OnSettingsChanged);

        if (_snapshot is null)
        {
            _tray = new TrayIcon(ShowFromTray, Hide, SetCloseToTray, ExitApp, _settings.CloseToTray);
            Closing += OnClosing;
            SystemEvents.UserPreferenceChanged += OnUserPreferenceChanged;
        }
        else
        {
            ShowActivated = false;
        }
        Loaded += async (_, _) => await InitializeWebAsync();
    }

    public void StartHidden()
    {
        // Create the window handle so WebView2 can load, but keep it in the tray.
        WindowState = WindowState.Minimized;
        Show();
        Hide();
        WindowState = WindowState.Normal;
    }

    public void ShowFromTray()
    {
        if (!IsVisible) Show();
        if (WindowState == WindowState.Minimized) WindowState = WindowState.Normal;
        Activate();
        Topmost = true;
        Topmost = false;
        Focus();
    }

    private async Task InitializeWebAsync()
    {
        try
        {
            Directory.CreateDirectory(AppPaths.WebViewDataDir);
            var env = await CoreWebView2Environment.CreateAsync(null, AppPaths.WebViewDataDir);
            await Web.EnsureCoreWebView2Async(env);
        }
        catch (Exception ex)
        {
            AppLog.Error($"WebView2 failed: {ex.Message}");
            Web.Visibility = Visibility.Collapsed;
            Fallback.Text = "The Microsoft Edge WebView2 Runtime is needed to show this window.\n\n" +
                            "Install it from https://developer.microsoft.com/microsoft-edge/webview2/ and start the app again.\n\n" + ex.Message;
            Fallback.Visibility = Visibility.Visible;
            if (_snapshot is not null) Application.Current.Shutdown(3);
            return;
        }

        var core = Web.CoreWebView2;
        core.SetVirtualHostNameToFolderMapping("app.mii", AppPaths.WebRoot, CoreWebView2HostResourceAccessKind.DenyCors);
#if DEBUG
        core.Settings.AreDevToolsEnabled = true;
#else
        core.Settings.AreDevToolsEnabled = false;
        core.Settings.AreDefaultContextMenusEnabled = false;
#endif
        core.Settings.IsStatusBarEnabled = false;
        core.Settings.AreBrowserAcceleratorKeysEnabled = false;
        core.NavigationStarting += (_, e) =>
        {
            if (e.Uri.StartsWith(Origin, StringComparison.OrdinalIgnoreCase)) return;
            e.Cancel = true;
            OpenExternal(e.Uri);
        };
        core.NewWindowRequested += (_, e) =>
        {
            e.Handled = true;
            OpenExternal(e.Uri);
        };
        core.WebMessageReceived += OnWebMessage;
        core.Navigate(Origin + "index.html");
    }

    private static void OpenExternal(string uri)
    {
        if (uri.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
            Process.Start(new ProcessStartInfo(uri) { UseShellExecute = true });
    }

    private async void OnWebMessage(object? sender, CoreWebView2WebMessageReceivedEventArgs e)
    {
        if (!e.Source.StartsWith(Origin, StringComparison.OrdinalIgnoreCase)) return;
        var json = e.WebMessageAsJson;
        try
        {
            using var doc = JsonDocument.Parse(json);
            if (doc.RootElement.TryGetProperty("event", out var ev) && ev.GetString() == "ready")
            {
                if (_snapshot is not null) await TakeSnapshotAsync();
                return;
            }
        }
        catch (JsonException)
        {
            return;
        }

        var response = await _bridge!.HandleAsync(json);
        Web.CoreWebView2?.PostWebMessageAsJson(response);
    }

    private async Task TakeSnapshotAsync()
    {
        var s = _snapshot!;
        try
        {
            var options = JsonSerializer.Serialize(new { glass = s.Glass, view = s.View });
            await Web.CoreWebView2.ExecuteScriptAsync($"window.mii && window.mii.snapshot({options})");
            // Wait for the view's engine calls to finish (up to 30 s), then let it paint.
            for (var i = 0; i < 60; i++)
            {
                await Task.Delay(500);
                if (await Web.CoreWebView2.ExecuteScriptAsync("window.mii ? window.mii.idle() : true") == "true") break;
            }
            await Task.Delay(800);
            var dir = Path.GetDirectoryName(Path.GetFullPath(s.Path));
            if (!string.IsNullOrEmpty(dir)) Directory.CreateDirectory(dir);
            await using (var file = File.Create(s.Path))
                await Web.CoreWebView2.CapturePreviewAsync(CoreWebView2CapturePreviewImageFormat.Png, file);
            AppLog.Info($"snapshot written: {AppPaths.Redact(s.Path)} glass={s.Glass} view={s.View}");
            Application.Current.Shutdown(0);
        }
        catch (Exception ex)
        {
            AppLog.Error($"snapshot failed: {ex.Message}");
            Application.Current.Shutdown(4);
        }
    }

    private void PushEvent(string name, object data)
    {
        if (Web.CoreWebView2 is null) return;
        Web.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new { @event = name, data }, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }));
    }

    private void OnUserPreferenceChanged(object sender, UserPreferenceChangedEventArgs e) =>
        Dispatcher.BeginInvoke(() => PushEvent("visuals", SystemVisuals.Snapshot()));

    private void OnSettingsChanged() => _tray?.SetCloseToTray(_settings.CloseToTray);

    private void SetCloseToTray(bool value)
    {
        _settings.CloseToTray = value;
        SettingsStore.Save(_settings);
        PushEvent("settings", _settings);
    }

    private void OnClosing(object? sender, CancelEventArgs e)
    {
        if (_exitRequested || !_settings.CloseToTray)
        {
            Shutdown();
            return;
        }
        e.Cancel = true;
        Hide();
        if (!_settings.CloseToTrayExplained)
        {
            _settings.CloseToTrayExplained = true;
            SettingsStore.Save(_settings);
            _tray?.Notify(AppPaths.AppName, "Still running in the notification area. Use Exit in the tray menu to quit, or turn off Close to tray in Settings.");
        }
    }

    private void ExitApp()
    {
        _exitRequested = true;
        Close();
    }

    private void Shutdown()
    {
        SystemEvents.UserPreferenceChanged -= OnUserPreferenceChanged;
        _tray?.Dispose();
        _tray = null;
        Application.Current.Shutdown(0);
    }
}
