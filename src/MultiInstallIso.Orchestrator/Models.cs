namespace MultiInstallIso.Orchestrator;

internal enum AuditSeverity
{
    Info,
    Warning,
    Error
}

internal sealed record AuditFinding(
    AuditSeverity Severity,
    string File,
    int? Line,
    string Message,
    string Detail = "");

internal sealed class DefinitionParseResult
{
    public List<Dictionary<string, string>> Vms { get; } = [];
    public List<AuditFinding> Findings { get; } = [];
}

internal sealed record ProcessResult(int ExitCode, bool WasCanceled);

internal sealed record CommandOption(string DisplayName, string Kind)
{
    public override string ToString() => DisplayName;
}

internal sealed record PrerequisiteItem(
    string Name,
    string RequiredFor,
    string InstallTarget,
    string VerifyCommand,
    string Url);
