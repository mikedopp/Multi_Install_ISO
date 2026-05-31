using System.Text;

namespace MultiInstallIso.Orchestrator;

internal static class RepositoryAuditor
{
    private static readonly string[] RequiredFiles =
    [
        "README.md",
        "Build-Cluster.ps1",
        "cluster-vms.yaml",
        "local-vms.yml",
        "Get-WindowsISO.ps1",
        "New-UnattendXML.ps1",
        "PostDeploy.ps1",
        "docs\\RUNBOOK.md",
        "docs\\DEFINITION_AUTHORING.md",
        "docs\\MOCKUP.md",
        "templates\\powercli-vms.yaml",
        "templates\\powercli-vms.json",
        "templates\\powercli-vms.csv",
        "templates\\terraform.tfvars.json",
        "templates\\kubernetes-pods.json",
        "schemas\\build-cluster.schema.json",
        "schemas\\terraform-tfvars.schema.json",
        "schemas\\windows-pods.schema.json"
    ];

    public static async Task<List<AuditFinding>> AuditAsync(string root, Action<string> appendLog, CancellationToken cancellationToken)
    {
        var findings = new List<AuditFinding>();
        if (!Directory.Exists(root))
        {
            findings.Add(new AuditFinding(AuditSeverity.Error, root, null, "Project folder does not exist."));
            return findings;
        }

        foreach (var requiredFile in RequiredFiles)
        {
            var path = Path.Combine(root, requiredFile);
            if (!File.Exists(path))
            {
                findings.Add(new AuditFinding(AuditSeverity.Error, path, null, "Expected project file is missing."));
            }
        }

        findings.AddRange(await RunPowerShellSyntaxAuditAsync(root, appendLog, cancellationToken).ConfigureAwait(false));
        findings.AddRange(AuditJsonFiles(root));
        findings.AddRange(AuditKnownProjectRisks(root));

        if (findings.Count == 0)
        {
            findings.Add(new AuditFinding(AuditSeverity.Info, root, null, "No audit findings were detected."));
        }

        return findings
            .OrderByDescending(f => f.Severity)
            .ThenBy(f => f.File, StringComparer.OrdinalIgnoreCase)
            .ThenBy(f => f.Line ?? 0)
            .ToList();
    }

    private static async Task<List<AuditFinding>> RunPowerShellSyntaxAuditAsync(string root, Action<string> appendLog, CancellationToken cancellationToken)
    {
        var findings = new List<AuditFinding>();
        var script = $$"""
$files = Get-ChildItem -LiteralPath '{{EscapePowerShellSingleQuoted(root)}}' -File | Where-Object { $_.Extension -eq '.ps1' -or $_.Name -eq 'Multi_Install_ISO' }
foreach ($file in $files) {
    $tokens = $null
    $errors = $null
    [System.Management.Automation.Language.Parser]::ParseFile($file.FullName, [ref]$tokens, [ref]$errors) | Out-Null
    foreach ($errorRecord in $errors) {
        $message = $errorRecord.Message -replace '\r?\n', ' '
        "PS_PARSE|$($file.FullName)|$($errorRecord.Extent.StartLineNumber)|$message"
    }
}
""";

        var output = new List<string>();
        var result = await ProcessRunner.RunAsync(
            "powershell.exe",
            ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script],
            root,
            output.Add,
            cancellationToken).ConfigureAwait(false);

        foreach (var line in output.Where(line => line.StartsWith("PS_PARSE|", StringComparison.Ordinal)))
        {
            var parts = line.Split('|', 4);
            if (parts.Length == 4 && int.TryParse(parts[2], out var lineNumber))
            {
                findings.Add(new AuditFinding(AuditSeverity.Error, parts[1], lineNumber, "PowerShell parse error.", parts[3]));
            }
        }

        foreach (var line in output.Where(line => !line.StartsWith("PS_PARSE|", StringComparison.Ordinal) && !line.StartsWith("> ", StringComparison.Ordinal)))
        {
            appendLog(line);
        }

        if (result.ExitCode != 0 && !result.WasCanceled)
        {
            findings.Add(new AuditFinding(AuditSeverity.Warning, root, null, "PowerShell syntax audit exited with a non-zero code.", $"Exit code {result.ExitCode}."));
        }

        return findings;
    }

    private static IEnumerable<AuditFinding> AuditJsonFiles(string root)
    {
        foreach (var path in Directory.EnumerateFiles(root, "*.json", SearchOption.TopDirectoryOnly))
        {
            var lines = File.ReadAllLines(path);
            for (var i = 0; i < lines.Length; i++)
            {
                if (lines[i].TrimStart().StartsWith('#'))
                {
                    yield return new AuditFinding(AuditSeverity.Error, path, i + 1, "Strict JSON cannot contain hash comments.", "Remove comments, move notes to README, or rename as .jsonc for human-only samples.");
                    break;
                }
            }
        }
    }

    private static IEnumerable<AuditFinding> AuditKnownProjectRisks(string root)
    {
        var newUnattend = Path.Combine(root, "New-UnattendXML.ps1");
        if (File.Exists(newUnattend) && HasExecutableBeforeParam(newUnattend, out var line))
        {
            yield return new AuditFinding(AuditSeverity.Error, newUnattend, line, "The script runs code before its param block.", "Move Install-Module below param, or the param block is not treated as script parameters.");
        }

        var podPower = Path.Combine(root, "Pod-Power.ps1");
        if (File.Exists(podPower) && ReferencesLegacyPodsJson(File.ReadAllText(podPower)) && !File.Exists(Path.Combine(root, "pods.json")))
        {
            yield return new AuditFinding(AuditSeverity.Error, podPower, 1, "Pod-Power.ps1 references pods.json, but the repo contains windows-pods.json.", "Rename the file or parameterize the pod definition path.");
        }

        var readme = Path.Combine(root, "README.md");
        if (File.Exists(readme))
        {
            var readmeText = File.ReadAllText(readme);
            foreach (var referenced in new[] { "Build-Cluster.ps1", "cluster-vms.yaml", "scripts\\Provision-VMs.ps1", "scripts/Provision-VMs.ps1" })
            {
                if (readmeText.Contains(referenced, StringComparison.OrdinalIgnoreCase) && !File.Exists(Path.Combine(root, referenced.Replace('/', Path.DirectorySeparatorChar))))
                {
                    yield return new AuditFinding(AuditSeverity.Warning, readme, null, $"README references missing file '{referenced}'.", "Update docs or add the expected orchestration script.");
                }
            }
        }

        var postDeploy = Path.Combine(root, "PostDeploy.ps1");
        if (File.Exists(postDeploy))
        {
            var lines = File.ReadAllLines(postDeploy);
            AddLineFinding(lines, postDeploy, "AzureDevOpsPat@", AuditSeverity.Warning, "PAT is embedded into the git clone URL.", "This can leak through logs, process lists, remotes, or shell history.", out var patFinding);
            if (patFinding is not null)
            {
                yield return patFinding;
            }

            AddLineFinding(lines, postDeploy, "iex (", AuditSeverity.Warning, "Downloaded script is executed with iex.", "Pin the source, verify checksum/signature, or install through a controlled package source.", out var iexFinding);
            if (iexFinding is not null)
            {
                yield return iexFinding;
            }
        }

        var legacy = Path.Combine(root, "Multi_Install_ISO");
        if (File.Exists(legacy))
        {
            var lines = File.ReadAllLines(legacy);
            AddLineFinding(lines, legacy, "\\Secure\\admin0.json", AuditSeverity.Warning, "Legacy script assumes a machine-specific credential path.", "Pass credentials as parameters or use SecretManagement/Windows Credential Manager.", out var credentialFinding);
            if (credentialFinding is not null)
            {
                yield return credentialFinding;
            }

            AddLineFinding(lines, legacy, "PowerCli_Associated_Files", AuditSeverity.Warning, "Legacy script imports a machine-specific module path.", "Resolve modules relative to the repo or document the dependency path.", out var moduleFinding);
            if (moduleFinding is not null)
            {
                yield return moduleFinding;
            }
        }

        var terraform = Path.Combine(root, "main.tf");
        if (File.Exists(terraform))
        {
            var terraformText = File.ReadAllText(terraform);
            if (terraformText.Contains("data.vsphere_", StringComparison.Ordinal) && !terraformText.Contains("data \"vsphere_", StringComparison.Ordinal))
            {
                yield return new AuditFinding(AuditSeverity.Warning, terraform, null, "Terraform references vSphere data sources that are not declared.", "Add provider and data source blocks before relying on terraform plan/apply.");
            }
        }

        var getIso = Path.Combine(root, "Get-WindowsISO.ps1");
        if (File.Exists(getIso))
        {
            var lines = File.ReadAllLines(getIso);
            AddLineFinding(lines, getIso, "raw.githubusercontent.com/pbatard/Fido", AuditSeverity.Info, "ISO helper downloads Fido from GitHub at runtime.", "For repeatable builds, pin a commit and verify the file before execution.", out var fidoFinding);
            if (fidoFinding is not null)
            {
                yield return fidoFinding;
            }
        }
    }

    private static bool HasExecutableBeforeParam(string path, out int lineNumber)
    {
        lineNumber = 0;
        var lines = File.ReadAllLines(path);
        for (var i = 0; i < lines.Length; i++)
        {
            var trimmed = lines[i].Trim();
            if (trimmed.Length == 0 || trimmed.StartsWith('#') || trimmed.StartsWith("<#") || trimmed.StartsWith("*") || trimmed.StartsWith("#>"))
            {
                continue;
            }

            if (trimmed.StartsWith("param", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            lineNumber = i + 1;
            return true;
        }

        return false;
    }

    private static void AddLineFinding(string[] lines, string file, string needle, AuditSeverity severity, string message, string detail, out AuditFinding? finding)
    {
        finding = null;
        for (var i = 0; i < lines.Length; i++)
        {
            if (lines[i].Contains(needle, StringComparison.OrdinalIgnoreCase))
            {
                finding = new AuditFinding(severity, file, i + 1, message, detail);
                return;
            }
        }
    }

    private static bool ReferencesLegacyPodsJson(string text)
    {
        return text.Contains("'pods.json'", StringComparison.OrdinalIgnoreCase)
            || text.Contains("\"pods.json\"", StringComparison.OrdinalIgnoreCase)
            || text.Contains(" pods.json", StringComparison.OrdinalIgnoreCase);
    }

    private static string EscapePowerShellSingleQuoted(string value)
    {
        var builder = new StringBuilder(value.Length + 8);
        foreach (var c in value)
        {
            builder.Append(c == '\'' ? "''" : c);
        }

        return builder.ToString();
    }
}
