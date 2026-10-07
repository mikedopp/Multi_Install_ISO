using System.IO;
using Forms = System.Windows.Forms;

namespace MultiInstallIso.App.Services;

/// <summary>Notification-area icon: version, Show, Hide, Close to tray, Exit.</summary>
internal sealed class TrayIcon : IDisposable
{
    private readonly Forms.NotifyIcon _icon;
    private readonly Forms.ToolStripMenuItem _closeToTray;

    public TrayIcon(Action show, Action hide, Action<bool> setCloseToTray, Action exit, bool closeToTray)
    {
        var menu = new Forms.ContextMenuStrip();
        var title = new Forms.ToolStripMenuItem($"{AppPaths.AppName} {VersionInfo.Display}") { Enabled = false };
        _closeToTray = new Forms.ToolStripMenuItem("Close to tray") { CheckOnClick = true, Checked = closeToTray };
        _closeToTray.CheckedChanged += (_, _) => setCloseToTray(_closeToTray.Checked);
        menu.Items.Add(title);
        menu.Items.Add(new Forms.ToolStripSeparator());
        menu.Items.Add("Show", null, (_, _) => show());
        menu.Items.Add("Hide", null, (_, _) => hide());
        menu.Items.Add(_closeToTray);
        menu.Items.Add(new Forms.ToolStripSeparator());
        menu.Items.Add("Exit", null, (_, _) => exit());

        using var stream = System.Windows.Application.GetResourceStream(new Uri("pack://application:,,,/Assets/MultiInstallIso.ico"))?.Stream
            ?? throw new FileNotFoundException("App icon resource is missing.");
        _icon = new Forms.NotifyIcon
        {
            Icon = new System.Drawing.Icon(stream, Forms.SystemInformation.SmallIconSize),
            Text = $"{AppPaths.AppName} {VersionInfo.Display}",
            ContextMenuStrip = menu,
            Visible = true
        };
        _icon.DoubleClick += (_, _) => show();
    }

    public void SetCloseToTray(bool value)
    {
        if (_closeToTray.Checked != value) _closeToTray.Checked = value;
    }

    public void Notify(string title, string text) =>
        _icon.ShowBalloonTip(5000, title, text, Forms.ToolTipIcon.Info);

    public void Dispose()
    {
        _icon.Visible = false;
        _icon.Dispose();
    }
}
