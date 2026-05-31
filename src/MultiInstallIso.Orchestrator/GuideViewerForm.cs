using System.Diagnostics;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;

namespace MultiInstallIso.Orchestrator;

internal sealed partial class GuideViewerForm : Form
{
    private static readonly Color Back = Color.FromArgb(24, 26, 31);
    private static readonly Color Panel = Color.FromArgb(32, 35, 42);
    private static readonly Color TextColor = Color.FromArgb(232, 235, 240);
    private static readonly Color Accent = Color.FromArgb(104, 170, 255);
    private readonly string _path;
    private readonly WebBrowser _browser = new() { Dock = DockStyle.Fill, AllowWebBrowserDrop = false, IsWebBrowserContextMenuEnabled = true };

    public GuideViewerForm(string path)
    {
        _path = path;
        Text = Path.GetFileName(path);
        StartPosition = FormStartPosition.CenterParent;
        MinimumSize = new Size(760, 560);
        Size = new Size(980, 760);
        BackColor = Back;
        ForeColor = TextColor;

        var layout = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            RowCount = 2,
            ColumnCount = 1,
            Padding = new Padding(10),
            BackColor = Back
        };
        layout.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        layout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        Controls.Add(layout);

        _browser.Navigating += BrowserNavigating;
        layout.Controls.Add(_browser, 0, 0);

        var buttons = new FlowLayoutPanel { Dock = DockStyle.Fill, AutoSize = true, FlowDirection = FlowDirection.RightToLeft, BackColor = Back };
        var close = CreateButton("Close");
        close.Click += (_, _) => Close();
        buttons.Controls.Add(close);

        var external = CreateButton("Open External");
        external.Click += (_, _) => Process.Start(new ProcessStartInfo(_path) { UseShellExecute = true });
        buttons.Controls.Add(external);

        var copyPath = CreateButton("Copy Path");
        copyPath.Click += (_, _) => Clipboard.SetText(_path);
        buttons.Controls.Add(copyPath);
        layout.Controls.Add(buttons, 0, 1);

        LoadMarkdown();
    }

    private static Button CreateButton(string text)
    {
        return new Button
        {
            Text = text,
            AutoSize = true,
            FlatStyle = FlatStyle.Flat,
            BackColor = Panel,
            ForeColor = TextColor
        };
    }

    private void LoadMarkdown()
    {
        var markdown = File.Exists(_path)
            ? File.ReadAllText(_path)
            : $"# Not Found\n\nCould not find `{_path}`.";
        _browser.DocumentText = BuildHtml(markdown, Path.GetDirectoryName(_path) ?? Environment.CurrentDirectory);
    }

    private void BrowserNavigating(object? sender, WebBrowserNavigatingEventArgs e)
    {
        if (e.Url is null || e.Url.Scheme == "about")
        {
            return;
        }

        e.Cancel = true;
        var target = e.Url.IsFile ? e.Url.LocalPath : e.Url.ToString();
        if (File.Exists(target) && Path.GetExtension(target).Equals(".md", StringComparison.OrdinalIgnoreCase))
        {
            new GuideViewerForm(target).Show(this);
            return;
        }

        Process.Start(new ProcessStartInfo(target) { UseShellExecute = true });
    }

    private static string BuildHtml(string markdown, string baseDirectory)
    {
        var body = MarkdownToHtml(markdown);
        var baseUri = new Uri(baseDirectory.EndsWith(Path.DirectorySeparatorChar)
            ? baseDirectory
            : baseDirectory + Path.DirectorySeparatorChar).AbsoluteUri;

        return $$"""
<!doctype html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta charset="utf-8" />
<base href="{{baseUri}}">
<style>
body {
  background: #181a1f;
  color: #e8ebf0;
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 15px;
  line-height: 1.55;
  margin: 0;
  padding: 28px 36px;
}
h1, h2, h3 { color: #f4f7fb; margin-top: 1.25em; }
h1 { font-size: 30px; border-bottom: 1px solid #3c4658; padding-bottom: 10px; }
h2 { font-size: 22px; color: #9fc6ff; }
h3 { font-size: 18px; color: #c7dcff; }
a { color: #68aaff; text-decoration: none; }
a:hover { text-decoration: underline; }
code {
  color: #ffe6a6;
  background: #252a33;
  border: 1px solid #3a4351;
  border-radius: 4px;
  padding: 1px 4px;
}
pre {
  background: #101216;
  border: 1px solid #3a4351;
  border-radius: 6px;
  padding: 14px;
  overflow-x: auto;
}
pre code {
  background: transparent;
  border: 0;
  padding: 0;
  color: #d8e2f2;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin: 14px 0;
}
th, td {
  border: 1px solid #3a4351;
  padding: 7px 9px;
  vertical-align: top;
}
th {
  background: #252a33;
  color: #ffffff;
}
tr:nth-child(even) td { background: #1f232b; }
blockquote {
  border-left: 4px solid #68aaff;
  margin-left: 0;
  padding-left: 14px;
  color: #c9d3e4;
}
</style>
</head>
<body>
{{body}}
</body>
</html>
""";
    }

    private static string MarkdownToHtml(string markdown)
    {
        var html = new StringBuilder();
        var inCode = false;
        var inList = false;
        var inTable = false;
        var code = new StringBuilder();
        var paragraph = new StringBuilder();

        foreach (var rawLine in markdown.Replace("\r\n", "\n").Split('\n'))
        {
            var line = rawLine.TrimEnd();
            if (line.StartsWith("```", StringComparison.Ordinal))
            {
                FlushParagraph();
                if (inCode)
                {
                    html.Append("<pre><code>");
                    html.Append(WebUtility.HtmlEncode(code.ToString().TrimEnd('\n')));
                    html.AppendLine("</code></pre>");
                    code.Clear();
                    inCode = false;
                }
                else
                {
                    CloseList();
                    CloseTable();
                    inCode = true;
                }
                continue;
            }

            if (inCode)
            {
                code.AppendLine(line);
                continue;
            }

            if (string.IsNullOrWhiteSpace(line))
            {
                FlushParagraph();
                CloseList();
                CloseTable();
                continue;
            }

            if (TryAppendTable(line))
            {
                continue;
            }

            CloseTable();

            if (line.StartsWith("# ", StringComparison.Ordinal))
            {
                FlushParagraph();
                CloseList();
                html.AppendLine($"<h1>{Inline(line[2..])}</h1>");
                continue;
            }

            if (line.StartsWith("## ", StringComparison.Ordinal))
            {
                FlushParagraph();
                CloseList();
                html.AppendLine($"<h2>{Inline(line[3..])}</h2>");
                continue;
            }

            if (line.StartsWith("### ", StringComparison.Ordinal))
            {
                FlushParagraph();
                CloseList();
                html.AppendLine($"<h3>{Inline(line[4..])}</h3>");
                continue;
            }

            if (line.StartsWith("- ", StringComparison.Ordinal))
            {
                FlushParagraph();
                if (!inList)
                {
                    html.AppendLine("<ul>");
                    inList = true;
                }
                html.AppendLine($"<li>{Inline(line[2..])}</li>");
                continue;
            }

            CloseList();
            if (paragraph.Length > 0)
            {
                paragraph.Append(' ');
            }
            paragraph.Append(line.Trim());
        }

        FlushParagraph();
        CloseList();
        CloseTable();
        return html.ToString();

        bool TryAppendTable(string line)
        {
            if (!line.Contains('|'))
            {
                return false;
            }

            if (Regex.IsMatch(line.Trim(), @"^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$"))
            {
                return true;
            }

            var cells = line.Trim().Trim('|').Split('|').Select(cell => Inline(cell.Trim())).ToArray();
            FlushParagraph();
            CloseList();
            if (!inTable)
            {
                html.AppendLine("<table>");
                html.Append("<tr>");
                foreach (var cell in cells)
                {
                    html.Append($"<th>{cell}</th>");
                }
                html.AppendLine("</tr>");
                inTable = true;
            }
            else
            {
                html.Append("<tr>");
                foreach (var cell in cells)
                {
                    html.Append($"<td>{cell}</td>");
                }
                html.AppendLine("</tr>");
            }
            return true;
        }

        void FlushParagraph()
        {
            if (paragraph.Length == 0)
            {
                return;
            }
            html.AppendLine($"<p>{Inline(paragraph.ToString())}</p>");
            paragraph.Clear();
        }

        void CloseList()
        {
            if (!inList)
            {
                return;
            }
            html.AppendLine("</ul>");
            inList = false;
        }

        void CloseTable()
        {
            if (!inTable)
            {
                return;
            }
            html.AppendLine("</table>");
            inTable = false;
        }
    }

    private static string Inline(string value)
    {
        var encoded = WebUtility.HtmlEncode(value);
        encoded = LinkRegex().Replace(encoded, match =>
            $"<a href=\"{WebUtility.HtmlEncode(match.Groups["url"].Value)}\">{match.Groups["text"].Value}</a>");
        encoded = CodeRegex().Replace(encoded, match => $"<code>{match.Groups["code"].Value}</code>");
        return encoded;
    }

    [GeneratedRegex(@"\[(?<text>[^\]]+)\]\((?<url>[^)]+)\)")]
    private static partial Regex LinkRegex();

    [GeneratedRegex("`(?<code>[^`]+)`")]
    private static partial Regex CodeRegex();
}
