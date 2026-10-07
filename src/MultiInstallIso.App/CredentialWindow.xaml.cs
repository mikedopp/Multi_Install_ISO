using System.Text.Json;
using System.Text.RegularExpressions;
using System.Windows;

namespace MultiInstallIso.App;

/// <summary>
/// Native dialog for the secrets that go onto answer media. They never pass through the web
/// UI; the host hands them to the engine on stdin.
/// </summary>
public partial class CredentialWindow : Window
{
    private readonly bool _windows;
    private readonly bool _linux;
    private string? _payload;

    public CredentialWindow(bool needWindows, bool needLinux, IReadOnlyList<string> domains, int vmCount)
    {
        InitializeComponent();
        _windows = needWindows;
        _linux = needLinux;
        Intro.Text = $"Answer media will be built for {vmCount} VM(s). Enter the credentials the unattended install should set.";
        WindowsPanel.Visibility = needWindows ? Visibility.Visible : Visibility.Collapsed;
        LinuxPanel.Visibility = needLinux ? Visibility.Visible : Visibility.Collapsed;
        DomainPanel.Visibility = domains.Count > 0 ? Visibility.Visible : Visibility.Collapsed;
        DomainTitle.Text = "Domain join: " + string.Join(", ", domains);
        Loaded += (_, _) => (needWindows ? (UIElement)AdminPassword : RootHash).Focus();
    }

    private void Build_Click(object sender, RoutedEventArgs e)
    {
        string? problem = null;
        if (_windows)
        {
            if (string.IsNullOrWhiteSpace(AdminUser.Text)) problem = "Enter the administrator user name.";
            else if (AdminPassword.Password.Length == 0) problem = "Enter the administrator password.";
            else if (AdminPassword.Password != AdminConfirm.Password) problem = "The administrator passwords do not match.";
            else if (DomainUser.Text.Length > 0 && DomainPassword.Password.Length == 0) problem = "Enter the domain join password.";
        }
        if (problem is null && _linux && !Regex.IsMatch(RootHash.Text.Trim(), @"^\$(6|5|y|2b)\$"))
            problem = "The root password hash must start with $6$, $5$, $y$ or $2b$ (openssl passwd -6).";
        if (problem is not null)
        {
            ErrorText.Text = problem;
            ErrorText.Visibility = Visibility.Visible;
            return;
        }

        _payload = JsonSerializer.Serialize(new
        {
            adminUser = _windows ? AdminUser.Text.Trim() : null,
            adminPassword = _windows ? AdminPassword.Password : null,
            domainUser = _windows && DomainUser.Text.Length > 0 ? DomainUser.Text.Trim() : null,
            domainPassword = _windows && DomainUser.Text.Length > 0 ? DomainPassword.Password : null,
            productKey = _windows && ProductKey.Password.Length > 0 ? ProductKey.Password : null,
            rootPasswordHash = _linux ? RootHash.Text.Trim() : null
        });
        AdminPassword.Clear(); AdminConfirm.Clear(); DomainPassword.Clear(); ProductKey.Clear();
        DialogResult = true;
    }

    /// <summary>Returns the payload once and forgets it.</summary>
    public string TakePayloadJson()
    {
        var p = _payload ?? throw new InvalidOperationException("No credentials were entered.");
        _payload = null;
        return p;
    }
}
