using System.Threading;
using System.Windows;
using System.Windows.Threading;
using MultiInstallIso.App.Services;

namespace MultiInstallIso.App;

public partial class App : Application
{
    private const string MutexName = @"Local\MultiInstallIso.App.SingleInstance";
    private const string ShowEventName = @"Local\MultiInstallIso.App.Show";

    private Mutex? _instance;
    private EventWaitHandle? _showSignal;
    private RegisteredWaitHandle? _showWait;

    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);
        DispatcherUnhandledException += OnUnhandled;
        var args = e.Args;

        if (args.Contains("--smoke", StringComparer.OrdinalIgnoreCase))
        {
            var outPath = ArgValue(args, "--out");
            Shutdown(Task.Run(() => SmokeTest.RunAsync(outPath)).GetAwaiter().GetResult());
            return;
        }

        if (ArgValue(args, "--snapshot") is { } snapshotPath)
        {
            // Snapshot mode renders one view to a PNG and exits; it never touches saved settings.
            var glass = ArgValue(args, "--glass") is not "off";
            var view = ArgValue(args, "--view") ?? "overview";
            var window = new MainWindow(new SnapshotRequest(snapshotPath, glass, view));
            MainWindow = window;
            window.Show();
            return;
        }

        _instance = new Mutex(true, MutexName, out var first);
        if (!first)
        {
            // A second launch brings the running window back instead of starting another copy.
            try { EventWaitHandle.OpenExisting(ShowEventName).Set(); } catch { }
            Shutdown(0);
            return;
        }

        _showSignal = new EventWaitHandle(false, EventResetMode.AutoReset, ShowEventName);
        var main = new MainWindow(null);
        MainWindow = main;
        _showWait = ThreadPool.RegisterWaitForSingleObject(_showSignal, (_, _) => Dispatcher.BeginInvoke(main.ShowFromTray), null, Timeout.Infinite, false);
        AppLog.Info($"start {VersionInfo.Display} pid={Environment.ProcessId} exe={Environment.ProcessPath}");

        if (args.Contains("--background", StringComparer.OrdinalIgnoreCase)) main.StartHidden();
        else main.Show();
    }

    protected override void OnExit(ExitEventArgs e)
    {
        _showWait?.Unregister(null);
        _showSignal?.Dispose();
        if (_instance is not null)
        {
            try { _instance.ReleaseMutex(); } catch { }
            _instance.Dispose();
        }
        AppLog.Info($"exit code={e.ApplicationExitCode}");
        base.OnExit(e);
    }

    private static string? ArgValue(string[] args, string name)
    {
        var i = Array.FindIndex(args, a => string.Equals(a, name, StringComparison.OrdinalIgnoreCase));
        return i >= 0 && i + 1 < args.Length ? args[i + 1] : null;
    }

    private void OnUnhandled(object sender, DispatcherUnhandledExceptionEventArgs e)
    {
        AppLog.Error($"unhandled: {e.Exception}");
        MessageBox.Show(e.Exception.Message, AppPaths.AppName, MessageBoxButton.OK, MessageBoxImage.Error);
        e.Handled = true;
    }
}
