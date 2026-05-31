using System.Diagnostics;
using System.Text;

namespace MultiInstallIso.Orchestrator;

internal static class ProcessRunner
{
    public static async Task<ProcessResult> RunAsync(
        string executable,
        IReadOnlyList<string> arguments,
        string workingDirectory,
        Action<string> appendOutput,
        CancellationToken cancellationToken)
    {
        using var process = new Process();
        process.StartInfo.FileName = executable;
        process.StartInfo.WorkingDirectory = workingDirectory;
        process.StartInfo.UseShellExecute = false;
        process.StartInfo.RedirectStandardOutput = true;
        process.StartInfo.RedirectStandardError = true;
        process.StartInfo.CreateNoWindow = true;

        foreach (var argument in arguments)
        {
            process.StartInfo.ArgumentList.Add(argument);
        }

        process.OutputDataReceived += (_, e) =>
        {
            if (e.Data is not null)
            {
                appendOutput(e.Data);
            }
        };

        process.ErrorDataReceived += (_, e) =>
        {
            if (e.Data is not null)
            {
                appendOutput(e.Data);
            }
        };

        appendOutput($"> {FormatCommand(executable, arguments)}");

        try
        {
            if (!process.Start())
            {
                appendOutput("Process did not start.");
                return new ProcessResult(-1, false);
            }

            process.BeginOutputReadLine();
            process.BeginErrorReadLine();

            await using var _ = cancellationToken.Register(() =>
            {
                try
                {
                    if (!process.HasExited)
                    {
                        process.Kill(entireProcessTree: true);
                    }
                }
                catch
                {
                    // Best effort cancellation.
                }
            });

            await process.WaitForExitAsync(cancellationToken).ConfigureAwait(false);
            return new ProcessResult(process.ExitCode, false);
        }
        catch (OperationCanceledException)
        {
            return new ProcessResult(process.HasExited ? process.ExitCode : -1, true);
        }
        catch (Exception ex)
        {
            appendOutput(ex.Message);
            return new ProcessResult(-1, false);
        }
    }

    public static string FormatCommand(string executable, IReadOnlyList<string> arguments)
    {
        var builder = new StringBuilder(Quote(executable));
        foreach (var argument in arguments)
        {
            builder.Append(' ');
            builder.Append(Quote(argument));
        }

        return builder.ToString();
    }

    public static string Quote(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return "\"\"";
        }

        if (!value.Any(char.IsWhiteSpace) && !value.Contains('"'))
        {
            return value;
        }

        return "\"" + value.Replace("\\", "\\\\").Replace("\"", "\\\"") + "\"";
    }
}
