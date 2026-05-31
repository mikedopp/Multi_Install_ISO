using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace MultiInstallIso.Orchestrator;

internal static partial class DefinitionParser
{
    private static readonly string[] RequiredNameKeys = ["vmname", "name"];
    private static readonly string[] RequiredOsKeys = ["os", "guest_id", "GuestIDOS"];
    private static readonly string[] RequiredCpuKeys = ["cpu", "num_cpus", "NumCPU"];
    private static readonly string[] RequiredMemoryKeys = ["ramGB", "memory", "OSRamSize"];
    private static readonly string[] RequiredDiskKeys = ["diskGB", "disk_size", "OSDiskSize"];

    public static DefinitionParseResult Parse(string path)
    {
        var result = new DefinitionParseResult();
        if (string.IsNullOrWhiteSpace(path) || !File.Exists(path))
        {
            result.Findings.Add(new AuditFinding(AuditSeverity.Error, path, null, "Definition file was not found."));
            return result;
        }

        var extension = Path.GetExtension(path).ToLowerInvariant();
        try
        {
            if (extension is ".json" or ".tfvars")
            {
                ParseJson(path, result);
            }
            else if (extension is ".yml" or ".yaml")
            {
                ParseYaml(path, result);
            }
            else if (extension is ".csv")
            {
                ParseCsv(path, result);
            }
            else
            {
                result.Findings.Add(new AuditFinding(AuditSeverity.Warning, path, null, "Unknown definition type.", "Use YAML, JSON, or CSV for best preview support."));
            }
        }
        catch (Exception ex)
        {
            result.Findings.Add(new AuditFinding(AuditSeverity.Error, path, null, "Definition parse failed.", ex.Message));
        }

        ValidateVmRecords(path, result);
        return result;
    }

    private static void ParseJson(string path, DefinitionParseResult result)
    {
        var raw = File.ReadAllText(path);
        var stripped = StripHashCommentLines(raw, path, result);
        using var document = JsonDocument.Parse(stripped, new JsonDocumentOptions { AllowTrailingCommas = true });
        var root = document.RootElement;

        if (root.ValueKind == JsonValueKind.Object && root.TryGetProperty("vms", out var vms) && vms.ValueKind == JsonValueKind.Array)
        {
            ReadJsonArray(vms, result, "vm");
            return;
        }

        if (root.ValueKind == JsonValueKind.Object && root.TryGetProperty("pods", out var pods) && pods.ValueKind == JsonValueKind.Array)
        {
            ReadJsonArray(pods, result, "pod");
            return;
        }

        if (root.ValueKind == JsonValueKind.Array)
        {
            ReadJsonArray(root, result, "vm");
            return;
        }

        result.Findings.Add(new AuditFinding(AuditSeverity.Warning, path, null, "JSON parsed, but no VM or pod array was found.", "Expected a top-level 'vms' or 'pods' array."));
    }

    private static void ReadJsonArray(JsonElement array, DefinitionParseResult result, string kind)
    {
        foreach (var item in array.EnumerateArray())
        {
            if (item.ValueKind != JsonValueKind.Object)
            {
                continue;
            }

            var row = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            row["__kind"] = kind;
            foreach (var property in item.EnumerateObject())
            {
                row[property.Name] = JsonToDisplayValue(property.Value);
            }

            result.Vms.Add(row);
        }
    }

    private static string JsonToDisplayValue(JsonElement value)
    {
        return value.ValueKind switch
        {
            JsonValueKind.String => value.GetString() ?? "",
            JsonValueKind.Number => value.GetRawText(),
            JsonValueKind.True => "true",
            JsonValueKind.False => "false",
            JsonValueKind.Array => string.Join(", ", value.EnumerateArray().Select(JsonToDisplayValue)),
            JsonValueKind.Object => value.GetRawText(),
            _ => ""
        };
    }

    private static void ParseYaml(string path, DefinitionParseResult result)
    {
        var lines = File.ReadAllLines(path);
        var current = default(Dictionary<string, string>);
        var inVms = false;

        for (var i = 0; i < lines.Length; i++)
        {
            var raw = lines[i];
            var trimmed = raw.Trim();
            if (trimmed.Length == 0 || trimmed.StartsWith('#'))
            {
                continue;
            }

            if (trimmed.Equals("vms:", StringComparison.OrdinalIgnoreCase))
            {
                inVms = true;
                continue;
            }

            if (!inVms)
            {
                continue;
            }

            var itemMatch = YamlListItemRegex().Match(raw);
            if (itemMatch.Success)
            {
                current = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
                result.Vms.Add(current);
                current[itemMatch.Groups["key"].Value] = CleanYamlValue(itemMatch.Groups["value"].Value);
                continue;
            }

            if (current is null)
            {
                continue;
            }

            var keyMatch = YamlKeyValueRegex().Match(raw);
            if (keyMatch.Success)
            {
                current[keyMatch.Groups["key"].Value] = CleanYamlValue(keyMatch.Groups["value"].Value);
            }
        }

        if (result.Vms.Count == 0)
        {
            result.Findings.Add(new AuditFinding(AuditSeverity.Warning, path, null, "No VMs were detected in the YAML file.", "The built-in preview supports the repo's simple 'vms:' shape."));
        }
    }

    private static void ParseCsv(string path, DefinitionParseResult result)
    {
        var lines = File.ReadAllLines(path);
        if (lines.Length == 0)
        {
            result.Findings.Add(new AuditFinding(AuditSeverity.Warning, path, null, "CSV file is empty."));
            return;
        }

        var headers = SplitCsvLine(lines[0]);
        for (var i = 1; i < lines.Length; i++)
        {
            if (string.IsNullOrWhiteSpace(lines[i]))
            {
                continue;
            }

            var cells = SplitCsvLine(lines[i]);
            var row = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            for (var column = 0; column < headers.Count && column < cells.Count; column++)
            {
                row[headers[column]] = cells[column];
            }

            result.Vms.Add(row);
        }
    }

    private static string StripHashCommentLines(string raw, string path, DefinitionParseResult result)
    {
        var builder = new StringBuilder();
        using var reader = new StringReader(raw);
        var lineNumber = 0;
        var foundComment = false;
        string? line;
        while ((line = reader.ReadLine()) is not null)
        {
            lineNumber++;
            if (line.TrimStart().StartsWith('#'))
            {
                foundComment = true;
                result.Findings.Add(new AuditFinding(AuditSeverity.Warning, path, lineNumber, "JSON contains a hash comment line.", "PowerShell ConvertFrom-Json and Terraform expect strict JSON."));
                continue;
            }

            builder.AppendLine(line);
        }

        if (foundComment)
        {
            result.Findings.Add(new AuditFinding(AuditSeverity.Info, path, null, "Preview ignored hash comment lines.", "Remove those comments or rename the file to .jsonc before using it with strict tools."));
        }

        return builder.ToString();
    }

    private static void ValidateVmRecords(string path, DefinitionParseResult result)
    {
        if (result.Vms.Count == 0)
        {
            return;
        }

        for (var i = 0; i < result.Vms.Count; i++)
        {
            var vm = result.Vms[i];
            if (vm.TryGetValue("__kind", out var kind) && kind.Equals("pod", StringComparison.OrdinalIgnoreCase))
            {
                ValidatePodRecord(path, result, vm, i);
                continue;
            }

            var label = GetValue(vm, RequiredNameKeys);
            var displayName = string.IsNullOrWhiteSpace(label) ? $"VM row {i + 1}" : label;

            RequireAny(path, result, vm, RequiredNameKeys, displayName, "VM name");
            RequireAny(path, result, vm, RequiredOsKeys, displayName, "guest OS");
            RequireAny(path, result, vm, RequiredCpuKeys, displayName, "CPU count");
            RequireAny(path, result, vm, RequiredMemoryKeys, displayName, "memory");
            RequireAny(path, result, vm, RequiredDiskKeys, displayName, "disk size");
            RequireAny(path, result, vm, ["network", "NetworkName", "vlan"], displayName, "network");

            foreach (var key in vm.Keys.Where(k => k.Contains("password", StringComparison.OrdinalIgnoreCase) || k.Contains("pass", StringComparison.OrdinalIgnoreCase)))
            {
                result.Findings.Add(new AuditFinding(AuditSeverity.Warning, path, null, $"{displayName} includes a password-like field '{key}'.", "Prefer environment variables, Key Vault, SecretManagement, or a secured prompt."));
            }

            var ip = GetValue(vm, ["ip"]);
            if (!string.IsNullOrWhiteSpace(ip) && !IPAddress.TryParse(ip, out _))
            {
                result.Findings.Add(new AuditFinding(AuditSeverity.Warning, path, null, $"{displayName} has an invalid IP address value '{ip}'."));
            }
        }
    }

    private static void ValidatePodRecord(string path, DefinitionParseResult result, Dictionary<string, string> row, int index)
    {
        var name = GetValue(row, ["name"]);
        var displayName = string.IsNullOrWhiteSpace(name) ? $"Pod row {index + 1}" : name;
        RequireAny(path, result, row, ["name"], displayName, "pod name");
        RequireAny(path, result, row, ["image"], displayName, "container image");

        var volumes = GetValue(row, ["volumes"]);
        if (!string.IsNullOrWhiteSpace(volumes) && volumes.Contains(@"\", StringComparison.Ordinal) && !volumes.Contains(@"\\", StringComparison.Ordinal))
        {
            result.Findings.Add(new AuditFinding(AuditSeverity.Warning, path, null, $"{displayName} may contain an unescaped Windows path.", "In JSON, use C:\\\\data rather than C:\\data."));
        }
    }

    private static void RequireAny(string path, DefinitionParseResult result, Dictionary<string, string> row, string[] keys, string displayName, string fieldName)
    {
        if (string.IsNullOrWhiteSpace(GetValue(row, keys)))
        {
            result.Findings.Add(new AuditFinding(AuditSeverity.Warning, path, null, $"{displayName} is missing {fieldName}.", $"Expected one of: {string.Join(", ", keys)}."));
        }
    }

    public static string GetValue(Dictionary<string, string> row, string[] keys)
    {
        foreach (var key in keys)
        {
            if (row.TryGetValue(key, out var value) && !string.IsNullOrWhiteSpace(value))
            {
                return value;
            }
        }

        return "";
    }

    private static string CleanYamlValue(string value)
    {
        var cleaned = value.Trim();
        if (cleaned.Equals("null", StringComparison.OrdinalIgnoreCase))
        {
            return "";
        }

        var hashIndex = cleaned.IndexOf(" #", StringComparison.Ordinal);
        if (hashIndex >= 0)
        {
            cleaned = cleaned[..hashIndex].TrimEnd();
        }

        if ((cleaned.StartsWith('"') && cleaned.EndsWith('"')) || (cleaned.StartsWith('\'') && cleaned.EndsWith('\'')))
        {
            cleaned = cleaned[1..^1];
        }

        return cleaned.Replace("\\\\", "\\");
    }

    private static List<string> SplitCsvLine(string line)
    {
        var values = new List<string>();
        var builder = new StringBuilder();
        var inQuotes = false;

        for (var i = 0; i < line.Length; i++)
        {
            var c = line[i];
            if (c == '"')
            {
                if (inQuotes && i + 1 < line.Length && line[i + 1] == '"')
                {
                    builder.Append('"');
                    i++;
                }
                else
                {
                    inQuotes = !inQuotes;
                }
            }
            else if (c == ',' && !inQuotes)
            {
                values.Add(builder.ToString().Trim());
                builder.Clear();
            }
            else
            {
                builder.Append(c);
            }
        }

        values.Add(builder.ToString().Trim());
        return values;
    }

    [GeneratedRegex(@"^\s*-\s*(?<key>[A-Za-z0-9_.-]+)\s*:\s*(?<value>.*)$")]
    private static partial Regex YamlListItemRegex();

    [GeneratedRegex(@"^\s{4,}(?<key>[A-Za-z0-9_.-]+)\s*:\s*(?<value>.*)$")]
    private static partial Regex YamlKeyValueRegex();
}
