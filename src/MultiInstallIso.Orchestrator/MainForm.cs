using System.Diagnostics;
using System.Drawing;
using System.Text.Json;

namespace MultiInstallIso.Orchestrator;

internal sealed class MainForm : Form
{
    private static readonly Color DarkBack = Color.FromArgb(24, 26, 31);
    private static readonly Color DarkPanel = Color.FromArgb(32, 35, 42);
    private static readonly Color DarkPanelAlt = Color.FromArgb(39, 43, 52);
    private static readonly Color DarkText = Color.FromArgb(232, 235, 240);
    private static readonly Color DarkMuted = Color.FromArgb(176, 184, 197);
    private static readonly Color DarkAccent = Color.FromArgb(104, 170, 255);
    private readonly TextBox _projectPathText = new();
    private readonly TextBox _definitionPathText = new();
    private readonly TextBox _artifactPathText = new();
    private readonly TextBox _vcenterServerText = new();
    private readonly TextBox _vcenterClusterText = new();
    private readonly ComboBox _commandCombo = new();
    private readonly TextBox _extraArgsText = new();
    private readonly CheckBox _previewOnlyCheck = new();
    private readonly TextBox _logText = new();
    private readonly ListView _auditList = new();
    private readonly DataGridView _vmGrid = new();
    private readonly ListBox _definitionIssues = new();
    private readonly TextBox _definitionEditorText = new();
    private readonly TextBox _definitionTipsText = new();
    private readonly ComboBox _editorTemplateCombo = new();
    private readonly ListBox _editorIssues = new();
    private readonly ListView _prereqList = new();
    private readonly ListView _runbookSteps = new();
    private readonly Label _statusLabel = new();
    private readonly Button _startButton = new();
    private readonly Button _stopButton = new();
    private CancellationTokenSource? _runningCommand;

    public MainForm(string? initialProjectRoot)
    {
        Text = "Multi Install ISO Orchestrator";
        StartPosition = FormStartPosition.CenterScreen;
        MinimumSize = new Size(1120, 720);
        Size = new Size(1280, 820);

        var root = ResolveProjectRoot(initialProjectRoot);
        _projectPathText.Text = root;
        _definitionPathText.Text = PickDefaultDefinition(root);
        _artifactPathText.Text = Path.Combine(root, "artifacts");

        BuildUi();
        ApplyDarkTheme(this);
        LoadCommandOptions();
        ValidateDefinition();
    }

    private void BuildUi()
    {
        var rootLayout = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            ColumnCount = 1,
            RowCount = 4,
            Padding = new Padding(12)
        };
        rootLayout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        rootLayout.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        rootLayout.RowStyles.Add(new RowStyle(SizeType.Absolute, 170));
        rootLayout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        Controls.Add(rootLayout);

        rootLayout.Controls.Add(BuildPathPanel(), 0, 0);

        var tabs = new TabControl { Dock = DockStyle.Fill };
        tabs.TabPages.Add(BuildPrerequisitesTab());
        tabs.TabPages.Add(BuildAuditTab());
        tabs.TabPages.Add(BuildDefinitionTab());
        tabs.TabPages.Add(BuildDefinitionEditorTab());
        tabs.TabPages.Add(BuildRunbookTab());
        rootLayout.Controls.Add(tabs, 0, 1);

        _logText.Dock = DockStyle.Fill;
        _logText.Multiline = true;
        _logText.ScrollBars = ScrollBars.Both;
        _logText.ReadOnly = true;
        _logText.Font = new Font(FontFamily.GenericMonospace, 9f);
        _logText.BackColor = Color.FromArgb(24, 24, 24);
        _logText.ForeColor = Color.Gainsboro;
        rootLayout.Controls.Add(_logText, 0, 2);

        var statusPanel = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            ColumnCount = 3,
            AutoSize = true
        };
        statusPanel.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));
        statusPanel.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        statusPanel.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));

        _statusLabel.Text = "Ready";
        _statusLabel.AutoSize = true;
        _statusLabel.Padding = new Padding(0, 8, 0, 0);
        statusPanel.Controls.Add(_statusLabel, 0, 0);

        _startButton.Text = "Start";
        _startButton.AutoSize = true;
        _startButton.Click += async (_, _) => await StartSelectedCommandAsync();
        statusPanel.Controls.Add(_startButton, 1, 0);

        _stopButton.Text = "Stop";
        _stopButton.AutoSize = true;
        _stopButton.Enabled = false;
        _stopButton.Click += (_, _) => _runningCommand?.Cancel();
        statusPanel.Controls.Add(_stopButton, 2, 0);

        rootLayout.Controls.Add(statusPanel, 0, 3);
    }

    private Control BuildPathPanel()
    {
        var panel = new TableLayoutPanel
        {
            Dock = DockStyle.Top,
            AutoSize = true,
            ColumnCount = 6,
            Padding = new Padding(0, 0, 0, 8)
        };
        panel.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        panel.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 45));
        panel.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        panel.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        panel.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 55));
        panel.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));

        panel.Controls.Add(new Label { Text = "Project", AutoSize = true, Padding = new Padding(0, 7, 8, 0) }, 0, 0);
        _projectPathText.Dock = DockStyle.Fill;
        panel.Controls.Add(_projectPathText, 1, 0);

        var browseProject = new Button { Text = "Browse", AutoSize = true };
        browseProject.Click += (_, _) => BrowseProject();
        panel.Controls.Add(browseProject, 2, 0);

        var openProject = new Button { Text = "Open Folder", AutoSize = true };
        openProject.Click += (_, _) => OpenFolder(ProjectRoot);
        panel.Controls.Add(openProject, 5, 0);

        panel.Controls.Add(new Label { Text = "Definition", AutoSize = true, Padding = new Padding(0, 7, 8, 0) }, 0, 1);
        _definitionPathText.Dock = DockStyle.Fill;
        panel.Controls.Add(_definitionPathText, 1, 1);

        var browseDefinition = new Button { Text = "Browse", AutoSize = true };
        browseDefinition.Click += (_, _) => BrowseDefinition();
        panel.Controls.Add(browseDefinition, 2, 1);

        panel.Controls.Add(new Label { Text = "Artifacts", AutoSize = true, Padding = new Padding(12, 7, 8, 0) }, 3, 1);
        _artifactPathText.Dock = DockStyle.Fill;
        panel.Controls.Add(_artifactPathText, 4, 1);

        return panel;
    }

    private TabPage BuildPrerequisitesTab()
    {
        var tab = new TabPage("Prerequisites");
        var layout = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            RowCount = 2,
            ColumnCount = 1,
            Padding = new Padding(8)
        };
        layout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        layout.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        tab.Controls.Add(layout);

        var buttons = new FlowLayoutPanel { Dock = DockStyle.Fill, AutoSize = true };
        var checkButton = new Button { Text = "Check Prereqs", AutoSize = true };
        checkButton.Click += async (_, _) => await CheckPrerequisitesAsync();
        buttons.Controls.Add(checkButton);

        var openGuide = new Button { Text = "Open Prereq Guide", AutoSize = true };
        openGuide.Click += (_, _) => OpenFile(Path.Combine(ProjectRoot, "docs", "PREREQUISITES.md"));
        buttons.Controls.Add(openGuide);

        var openLink = new Button { Text = "Open Selected Link", AutoSize = true };
        openLink.Click += (_, _) => OpenSelectedPrereqLink();
        buttons.Controls.Add(openLink);
        layout.Controls.Add(buttons, 0, 0);

        _prereqList.Dock = DockStyle.Fill;
        _prereqList.FullRowSelect = true;
        _prereqList.GridLines = true;
        _prereqList.View = View.Details;
        _prereqList.Columns.Add("Name", 170);
        _prereqList.Columns.Add("Used by", 140);
        _prereqList.Columns.Add("Install target", 360);
        _prereqList.Columns.Add("Verify", 210);
        _prereqList.Columns.Add("Official link", 420);
        _prereqList.DoubleClick += (_, _) => OpenSelectedPrereqLink();
        PopulatePrerequisites();
        layout.Controls.Add(_prereqList, 0, 1);

        return tab;
    }

    private TabPage BuildAuditTab()
    {
        var tab = new TabPage("Audit");
        var layout = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            RowCount = 2,
            ColumnCount = 1,
            Padding = new Padding(8)
        };
        layout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        layout.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        tab.Controls.Add(layout);

        var buttons = new FlowLayoutPanel { Dock = DockStyle.Fill, AutoSize = true };
        var auditButton = new Button { Text = "Audit Repository", AutoSize = true };
        auditButton.Click += async (_, _) => await RunAuditAsync();
        buttons.Controls.Add(auditButton);

        var prereqButton = new Button { Text = "Check Prereqs", AutoSize = true };
        prereqButton.Click += async (_, _) => await CheckPrerequisitesAsync();
        buttons.Controls.Add(prereqButton);

        var openFindingButton = new Button { Text = "Open Finding", AutoSize = true };
        openFindingButton.Click += (_, _) => OpenSelectedAuditFile();
        buttons.Controls.Add(openFindingButton);

        layout.Controls.Add(buttons, 0, 0);

        _auditList.Dock = DockStyle.Fill;
        _auditList.FullRowSelect = true;
        _auditList.GridLines = true;
        _auditList.View = View.Details;
        _auditList.Columns.Add("Severity", 90);
        _auditList.Columns.Add("File", 320);
        _auditList.Columns.Add("Line", 60);
        _auditList.Columns.Add("Message", 420);
        _auditList.Columns.Add("Detail", 520);
        _auditList.DoubleClick += (_, _) => OpenSelectedAuditFile();
        layout.Controls.Add(_auditList, 0, 1);

        return tab;
    }

    private TabPage BuildDefinitionEditorTab()
    {
        var tab = new TabPage("Definition Editor");
        var layout = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            ColumnCount = 1,
            RowCount = 3,
            Padding = new Padding(8)
        };
        layout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        layout.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        layout.RowStyles.Add(new RowStyle(SizeType.Absolute, 120));
        tab.Controls.Add(layout);

        var toolbar = new FlowLayoutPanel { Dock = DockStyle.Fill, AutoSize = true };

        _editorTemplateCombo.DropDownStyle = ComboBoxStyle.DropDownList;
        _editorTemplateCombo.Width = 230;
        _editorTemplateCombo.Items.AddRange([
            "PowerCLI YAML",
            "PowerCLI JSON",
            "PowerCLI CSV",
            "Terraform tfvars JSON",
            "Kubernetes pods JSON"
        ]);
        _editorTemplateCombo.SelectedIndex = 0;
        _editorTemplateCombo.SelectedIndexChanged += (_, _) => UpdateEditorTips();
        toolbar.Controls.Add(_editorTemplateCombo);

        var loadButton = new Button { Text = "Load Current", AutoSize = true };
        loadButton.Click += (_, _) => LoadCurrentDefinitionIntoEditor();
        toolbar.Controls.Add(loadButton);

        var insertTemplateButton = new Button { Text = "Insert Template", AutoSize = true };
        insertTemplateButton.Click += (_, _) => InsertEditorTemplate();
        toolbar.Controls.Add(insertTemplateButton);

        var validateButton = new Button { Text = "Validate", AutoSize = true };
        validateButton.Click += (_, _) => ValidateEditorContent();
        toolbar.Controls.Add(validateButton);

        var formatJsonButton = new Button { Text = "Format JSON", AutoSize = true };
        formatJsonButton.Click += (_, _) => FormatEditorJson();
        toolbar.Controls.Add(formatJsonButton);

        var saveButton = new Button { Text = "Save", AutoSize = true };
        saveButton.Click += (_, _) => SaveEditorContent();
        toolbar.Controls.Add(saveButton);

        var saveAsButton = new Button { Text = "Save As", AutoSize = true };
        saveAsButton.Click += (_, _) => SaveEditorContentAs();
        toolbar.Controls.Add(saveAsButton);

        var openGuideButton = new Button { Text = "Open Guide", AutoSize = true };
        openGuideButton.Click += (_, _) => OpenFile(Path.Combine(ProjectRoot, "docs", "DEFINITION_AUTHORING.md"));
        toolbar.Controls.Add(openGuideButton);

        layout.Controls.Add(toolbar, 0, 0);

        var split = new SplitContainer
        {
            Dock = DockStyle.Fill,
            SplitterDistance = 760
        };
        layout.Controls.Add(split, 0, 1);

        _definitionEditorText.AcceptsReturn = true;
        _definitionEditorText.AcceptsTab = true;
        _definitionEditorText.Dock = DockStyle.Fill;
        _definitionEditorText.Font = new Font(FontFamily.GenericMonospace, 10f);
        _definitionEditorText.Multiline = true;
        _definitionEditorText.ScrollBars = ScrollBars.Both;
        _definitionEditorText.WordWrap = false;
        split.Panel1.Controls.Add(_definitionEditorText);

        _definitionTipsText.Dock = DockStyle.Fill;
        _definitionTipsText.Multiline = true;
        _definitionTipsText.ReadOnly = true;
        _definitionTipsText.ScrollBars = ScrollBars.Vertical;
        _definitionTipsText.Font = new Font(FontFamily.GenericMonospace, 9f);
        split.Panel2.Controls.Add(_definitionTipsText);

        _editorIssues.Dock = DockStyle.Fill;
        layout.Controls.Add(_editorIssues, 0, 2);

        LoadCurrentDefinitionIntoEditor();
        UpdateEditorTips();
        return tab;
    }

    private TabPage BuildDefinitionTab()
    {
        var tab = new TabPage("VM Definition");
        var layout = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            RowCount = 3,
            ColumnCount = 1,
            Padding = new Padding(8)
        };
        layout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        layout.RowStyles.Add(new RowStyle(SizeType.Percent, 70));
        layout.RowStyles.Add(new RowStyle(SizeType.Percent, 30));
        tab.Controls.Add(layout);

        var buttons = new FlowLayoutPanel { Dock = DockStyle.Fill, AutoSize = true };
        var validateButton = new Button { Text = "Validate Definition", AutoSize = true };
        validateButton.Click += (_, _) => ValidateDefinition();
        buttons.Controls.Add(validateButton);

        var openDefinitionButton = new Button { Text = "Open Definition", AutoSize = true };
        openDefinitionButton.Click += (_, _) => OpenFile(_definitionPathText.Text);
        buttons.Controls.Add(openDefinitionButton);
        layout.Controls.Add(buttons, 0, 0);

        _vmGrid.AllowUserToAddRows = false;
        _vmGrid.AllowUserToDeleteRows = false;
        _vmGrid.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.DisplayedCells;
        _vmGrid.Dock = DockStyle.Fill;
        _vmGrid.ReadOnly = true;
        _vmGrid.RowHeadersVisible = false;
        layout.Controls.Add(_vmGrid, 0, 1);

        _definitionIssues.Dock = DockStyle.Fill;
        layout.Controls.Add(_definitionIssues, 0, 2);

        return tab;
    }

    private TabPage BuildRunbookTab()
    {
        var tab = new TabPage("Runbooks");
        var layout = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            ColumnCount = 1,
            RowCount = 3,
            Padding = new Padding(8)
        };
        layout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        layout.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        layout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        tab.Controls.Add(layout);

        var docButtons = new FlowLayoutPanel { Dock = DockStyle.Fill, AutoSize = true };
        var openRunbook = new Button { Text = "Open Runbook", AutoSize = true };
        openRunbook.Click += (_, _) => OpenFile(Path.Combine(ProjectRoot, "docs", "RUNBOOK.md"));
        docButtons.Controls.Add(openRunbook);

        var openPrereqs = new Button { Text = "Open Prereqs", AutoSize = true };
        openPrereqs.Click += (_, _) => OpenFile(Path.Combine(ProjectRoot, "docs", "PREREQUISITES.md"));
        docButtons.Controls.Add(openPrereqs);

        var openAuthoring = new Button { Text = "Open Authoring Guide", AutoSize = true };
        openAuthoring.Click += (_, _) => OpenFile(Path.Combine(ProjectRoot, "docs", "DEFINITION_AUTHORING.md"));
        docButtons.Controls.Add(openAuthoring);

        var openMockup = new Button { Text = "Open Mockup", AutoSize = true };
        openMockup.Click += (_, _) => OpenFile(Path.Combine(ProjectRoot, "docs", "MOCKUP.md"));
        docButtons.Controls.Add(openMockup);
        layout.Controls.Add(docButtons, 0, 0);

        _runbookSteps.Dock = DockStyle.Fill;
        _runbookSteps.FullRowSelect = true;
        _runbookSteps.GridLines = true;
        _runbookSteps.View = View.Details;
        _runbookSteps.Columns.Add("Step", 210);
        _runbookSteps.Columns.Add("Risk", 120);
        _runbookSteps.Columns.Add("Operator action", 760);
        PopulateRunbookSteps();
        layout.Controls.Add(_runbookSteps, 0, 1);

        var commandLayout = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            AutoSize = true,
            ColumnCount = 4,
            RowCount = 5,
            Padding = new Padding(0, 8, 0, 0)
        };
        commandLayout.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        commandLayout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50));
        commandLayout.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        commandLayout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50));
        layout.Controls.Add(commandLayout, 0, 2);

        commandLayout.Controls.Add(new Label { Text = "Command", AutoSize = true, Padding = new Padding(0, 7, 12, 0) }, 0, 0);
        _commandCombo.DropDownStyle = ComboBoxStyle.DropDownList;
        _commandCombo.Dock = DockStyle.Fill;
        commandLayout.SetColumnSpan(_commandCombo, 3);
        commandLayout.Controls.Add(_commandCombo, 1, 0);

        commandLayout.Controls.Add(new Label { Text = "vCenter", AutoSize = true, Padding = new Padding(0, 7, 12, 0) }, 0, 1);
        _vcenterServerText.Dock = DockStyle.Fill;
        commandLayout.Controls.Add(_vcenterServerText, 1, 1);

        commandLayout.Controls.Add(new Label { Text = "Cluster", AutoSize = true, Padding = new Padding(12, 7, 12, 0) }, 2, 1);
        _vcenterClusterText.Dock = DockStyle.Fill;
        commandLayout.Controls.Add(_vcenterClusterText, 3, 1);

        commandLayout.Controls.Add(new Label { Text = "Extra args", AutoSize = true, Padding = new Padding(0, 7, 12, 0) }, 0, 2);
        _extraArgsText.Dock = DockStyle.Fill;
        commandLayout.SetColumnSpan(_extraArgsText, 3);
        commandLayout.Controls.Add(_extraArgsText, 1, 2);

        _previewOnlyCheck.Text = "Preview command only";
        _previewOnlyCheck.AutoSize = true;
        _previewOnlyCheck.Checked = true;
        commandLayout.Controls.Add(_previewOnlyCheck, 1, 3);

        var hint = new Label
        {
            AutoSize = true,
            ForeColor = SystemColors.GrayText,
            Text = "Safe default: Build cluster plan only. Provisioning should run only after reviewing build-plan.json and a WhatIf preview.",
            Padding = new Padding(0, 10, 0, 0)
        };
        commandLayout.SetColumnSpan(hint, 3);
        commandLayout.Controls.Add(hint, 1, 4);

        return tab;
    }

    private void LoadCommandOptions()
    {
        _commandCombo.Items.AddRange(
        [
            new CommandOption("Audit repository", "audit"),
            new CommandOption("Validate VM definition", "validate"),
            new CommandOption("Build cluster plan only", "build-plan"),
            new CommandOption("Build cluster WhatIf preview", "build-whatif"),
            new CommandOption("Build cluster provision", "build-provision"),
            new CommandOption("Read definition through PowerShell", "read-definition"),
            new CommandOption("Generate Windows autounattend.xml", "unattend"),
            new CommandOption("Download Windows ISO", "download-iso"),
            new CommandOption("Python validate definition", "python-validate"),
            new CommandOption("Python convert definition to JSON", "python-convert-json"),
            new CommandOption("Run legacy CSV VM builder", "legacy-builder"),
            new CommandOption("Terraform init", "terraform-init"),
            new CommandOption("Terraform plan", "terraform-plan"),
            new CommandOption("Terraform apply", "terraform-apply")
        ]);
        _commandCombo.SelectedIndex = 2;
    }

    private async Task StartSelectedCommandAsync()
    {
        if (_commandCombo.SelectedItem is not CommandOption option)
        {
            return;
        }

        switch (option.Kind)
        {
            case "audit":
                await RunAuditAsync();
                return;
            case "validate":
                ValidateDefinition();
                return;
        }

        var command = BuildExternalCommand(option);
        if (command is null)
        {
            return;
        }

        if (_previewOnlyCheck.Checked)
        {
            AppendLog(ProcessRunner.FormatCommand(command.Value.Executable, command.Value.Arguments));
            return;
        }

        Directory.CreateDirectory(_artifactPathText.Text);
        _runningCommand = new CancellationTokenSource();
        SetBusy(true, $"Running {option.DisplayName}");
        try
        {
            var result = await ProcessRunner.RunAsync(command.Value.Executable, command.Value.Arguments, ProjectRoot, AppendLog, _runningCommand.Token);
            AppendLog(result.WasCanceled ? "Canceled." : $"Exit code: {result.ExitCode}");
            _statusLabel.Text = result.WasCanceled ? "Canceled" : $"Finished with exit code {result.ExitCode}";
        }
        finally
        {
            _runningCommand.Dispose();
            _runningCommand = null;
            SetBusy(false, "Ready");
        }
    }

    private (string Executable, IReadOnlyList<string> Arguments)? BuildExternalCommand(CommandOption option)
    {
        var extraArgs = SplitArguments(_extraArgsText.Text);
        var root = ProjectRoot;
        var artifacts = _artifactPathText.Text;

        switch (option.Kind)
        {
            case "build-plan":
            {
                var args = BuildClusterArguments(["-PlanOnly"]);
                args.AddRange(extraArgs);
                return ("powershell.exe", args);
            }
            case "build-whatif":
            {
                var args = BuildClusterArguments(["-WhatIf"]);
                args.AddRange(extraArgs);
                return ("powershell.exe", args);
            }
            case "build-provision":
            {
                var args = BuildClusterArguments([]);
                args.AddRange(extraArgs);
                return ("powershell.exe", args);
            }
            case "read-definition":
            {
                var script = $". '{EscapePowerShellPath(Path.Combine(root, "Read-VmDefinition.ps1"))}'; Read-VmDefinition -Path '{EscapePowerShellPath(_definitionPathText.Text)}' -AsJson";
                return ("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script]);
            }
            case "unattend":
            {
                var output = Path.Combine(artifacts, "autounattend.xml");
                var args = new List<string> { "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", Path.Combine(root, "New-UnattendXML.ps1"), "-Path", output };
                args.AddRange(extraArgs.Count == 0 ? ["-ComputerName", SelectedVmNameOrDefault()] : extraArgs);
                return ("powershell.exe", args);
            }
            case "download-iso":
            {
                var args = new List<string> { "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", Path.Combine(root, "Get-WindowsISO.ps1") };
                args.AddRange(extraArgs.Count == 0 ? ["-Edition", "ServerStandard", "-OutPath", artifacts] : extraArgs);
                return ("powershell.exe", args);
            }
            case "python-validate":
                return ("py.exe", ["-3", Path.Combine(root, "tools", "definition_helper.py"), "validate", _definitionPathText.Text, .. extraArgs]);
            case "python-convert-json":
                return ("py.exe", ["-3", Path.Combine(root, "tools", "definition_helper.py"), "convert", _definitionPathText.Text, Path.Combine(artifacts, "converted-definition.json"), "--target", "json", .. extraArgs]);
            case "legacy-builder":
                return ("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", Path.Combine(root, "Multi_Install_ISO"), .. extraArgs]);
            case "terraform-init":
                return ("terraform.exe", ["init", .. extraArgs]);
            case "terraform-plan":
                return ("terraform.exe", ["plan", "-var-file=terraform.tfvars.json", .. extraArgs]);
            case "terraform-apply":
                return ("terraform.exe", ["apply", "-var-file=terraform.tfvars.json", .. extraArgs]);
            default:
                MessageBox.Show(this, "Unknown command.", Text, MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return null;
        }
    }

    private List<string> BuildClusterArguments(IReadOnlyList<string> modeArguments)
    {
        var args = new List<string>
        {
            "-NoProfile",
            "-ExecutionPolicy",
            "Bypass",
            "-File",
            Path.Combine(ProjectRoot, "Build-Cluster.ps1"),
            "-DefinitionPath",
            _definitionPathText.Text,
            "-ArtifactRoot",
            _artifactPathText.Text
        };

        AddNamedArgument(args, "-VcenterServer", _vcenterServerText.Text);
        AddNamedArgument(args, "-VcenterCluster", _vcenterClusterText.Text);
        args.AddRange(modeArguments);
        return args;
    }

    private static void AddNamedArgument(List<string> args, string name, string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return;
        }

        args.Add(name);
        args.Add(value.Trim());
    }

    private async Task RunAuditAsync()
    {
        _auditList.Items.Clear();
        _runningCommand = new CancellationTokenSource();
        SetBusy(true, "Auditing repository");
        try
        {
            var findings = await RepositoryAuditor.AuditAsync(ProjectRoot, AppendLog, _runningCommand.Token);
            foreach (var finding in findings)
            {
                AddAuditFinding(finding);
            }

            _statusLabel.Text = $"{findings.Count} audit finding(s)";
        }
        finally
        {
            _runningCommand.Dispose();
            _runningCommand = null;
            SetBusy(false, _statusLabel.Text);
        }
    }

    private async Task CheckPrerequisitesAsync()
    {
        _auditList.Items.Clear();
        SetBusy(true, "Checking prerequisites");
        try
        {
            foreach (var command in new[] { "powershell.exe", "pwsh.exe", "git.exe", "dotnet.exe", "py.exe", "python.exe", "terraform.exe", "kubectl.exe" })
            {
                await CheckCommandAsync(command);
            }

            await CheckPowerShellModuleAsync("powershell-yaml");
            await CheckPowerShellModuleAsync("VMware.PowerCLI");
            await CheckPowerShellModuleAsync("UnattendXmlBuilder");
            await CheckPythonPackageAsync("yaml", "PyYAML");
        }
        finally
        {
            SetBusy(false, "Ready");
        }
    }

    private async Task CheckCommandAsync(string command)
    {
        var lines = new List<string>();
        var result = await ProcessRunner.RunAsync("powershell.exe", ["-NoProfile", "-Command", $"Get-Command {command} -ErrorAction Stop | Select-Object -ExpandProperty Source"], ProjectRoot, lines.Add, CancellationToken.None);
        var severity = result.ExitCode == 0 ? AuditSeverity.Info : AuditSeverity.Warning;
        var detail = result.ExitCode == 0 ? lines.LastOrDefault(line => !line.StartsWith("> ", StringComparison.Ordinal)) ?? "Found" : "Not found on PATH.";
        AddAuditFinding(new AuditFinding(severity, command, null, $"{command} prerequisite", detail));
    }

    private async Task CheckPowerShellModuleAsync(string moduleName)
    {
        var lines = new List<string>();
        var script = $"Get-Module -ListAvailable -Name {moduleName} | Select-Object -First 1 -ExpandProperty Version";
        var result = await ProcessRunner.RunAsync("powershell.exe", ["-NoProfile", "-Command", script], ProjectRoot, lines.Add, CancellationToken.None);
        var version = lines.FirstOrDefault(line => !line.StartsWith("> ", StringComparison.Ordinal));
        var found = result.ExitCode == 0 && !string.IsNullOrWhiteSpace(version);
        AddAuditFinding(new AuditFinding(found ? AuditSeverity.Info : AuditSeverity.Warning, moduleName, null, $"PowerShell module {moduleName}", found ? $"Version {version}" : "Not installed in the current PowerShell module path."));
    }

    private async Task CheckPythonPackageAsync(string importName, string displayName)
    {
        var lines = new List<string>();
        var result = await ProcessRunner.RunAsync("py.exe", ["-3", "-c", $"import {importName}; print({importName}.__version__)"], ProjectRoot, lines.Add, CancellationToken.None);
        var version = lines.FirstOrDefault(line => !line.StartsWith("> ", StringComparison.Ordinal));
        var found = result.ExitCode == 0 && !string.IsNullOrWhiteSpace(version);
        AddAuditFinding(new AuditFinding(found ? AuditSeverity.Info : AuditSeverity.Warning, displayName, null, $"Python package {displayName}", found ? $"Version {version}" : "Optional. Install with: py -3 -m pip install -r requirements-python.txt"));
    }

    private void ValidateDefinition()
    {
        var result = DefinitionParser.Parse(_definitionPathText.Text);
        _vmGrid.Columns.Clear();
        _vmGrid.Rows.Clear();
        _definitionIssues.Items.Clear();

        var keys = result.Vms
            .SelectMany(row => row.Keys)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(PinnedColumnOrder)
            .ThenBy(key => key, StringComparer.OrdinalIgnoreCase)
            .ToList();

        foreach (var key in keys)
        {
            _vmGrid.Columns.Add(key, key);
        }

        foreach (var vm in result.Vms)
        {
            var rowIndex = _vmGrid.Rows.Add();
            foreach (var key in keys)
            {
                _vmGrid.Rows[rowIndex].Cells[key].Value = vm.TryGetValue(key, out var value) ? value : "";
            }
        }

        foreach (var finding in result.Findings)
        {
            _definitionIssues.Items.Add($"{finding.Severity}: {finding.Message} {finding.Detail}".Trim());
        }

        _statusLabel.Text = $"{result.Vms.Count} VM definition row(s), {result.Findings.Count} issue(s)";
    }

    private static int PinnedColumnOrder(string key)
    {
        var order = new[] { "__kind", "vmname", "name", "image", "os", "GuestIDOS", "guest_id", "cpu", "NumCPU", "num_cpus", "ramGB", "memory", "diskGB", "disk_size", "datastore", "network", "vlan", "ip" };
        var index = Array.FindIndex(order, item => item.Equals(key, StringComparison.OrdinalIgnoreCase));
        return index < 0 ? 100 : index;
    }

    private void AddAuditFinding(AuditFinding finding)
    {
        var relative = TryMakeRelative(ProjectRoot, finding.File);
        var item = new ListViewItem(finding.Severity.ToString())
        {
            Tag = finding,
            ForeColor = finding.Severity switch
            {
                AuditSeverity.Error => Color.Firebrick,
                AuditSeverity.Warning => Color.DarkGoldenrod,
                _ => SystemColors.WindowText
            }
        };
        item.SubItems.Add(relative);
        item.SubItems.Add(finding.Line?.ToString() ?? "");
        item.SubItems.Add(finding.Message);
        item.SubItems.Add(finding.Detail);
        _auditList.Items.Add(item);
    }

    private string SelectedVmNameOrDefault()
    {
        if (_vmGrid.CurrentRow is not null)
        {
            foreach (var key in new[] { "vmname", "name" })
            {
                if (_vmGrid.Columns.Contains(key))
                {
                    var value = _vmGrid.CurrentRow.Cells[key].Value?.ToString();
                    if (!string.IsNullOrWhiteSpace(value))
                    {
                        return value;
                    }
                }
            }
        }

        return "NewVm";
    }

    private void PopulateRunbookSteps()
    {
        _runbookSteps.Items.Clear();
        foreach (var row in new[]
        {
            ("1. Audit repository", "Safe", "Run parser, JSON, and known-risk checks before any build."),
            ("2. Check prerequisites", "Safe", "Confirm PowerShell, Git, Terraform, PowerCLI, powershell-yaml, and UnattendXmlBuilder."),
            ("3. Edit and validate definition", "Safe", "Use the editor/templates to fix YAML, JSON, CSV, Terraform, or Kubernetes input."),
            ("4. Build plan", "Writes files", "Run Build-Cluster.ps1 -PlanOnly and review artifacts/<timestamp>/build-plan.json."),
            ("5. WhatIf preview", "Safe", "Preview vCenter actions with -WhatIf before creating anything."),
            ("6. Generate artifacts", "Writes files", "Create autounattend XML and ISO cache artifacts."),
            ("7. Provision VMs", "Creates infra", "Create and power on VMs only after review."),
            ("8. Verify post deploy", "Manual", "Check C:\\PostDeploy.log, IIS/API health, DNS, and app checkout.")
        })
        {
            var item = new ListViewItem(row.Item1);
            item.SubItems.Add(row.Item2);
            item.SubItems.Add(row.Item3);
            _runbookSteps.Items.Add(item);
        }
    }

    private void PopulatePrerequisites()
    {
        _prereqList.Items.Clear();
        foreach (var item in GetPrerequisites())
        {
            var row = new ListViewItem(item.Name) { Tag = item };
            row.SubItems.Add(item.RequiredFor);
            row.SubItems.Add(item.InstallTarget);
            row.SubItems.Add(item.VerifyCommand);
            row.SubItems.Add(item.Url);
            _prereqList.Items.Add(row);
        }
    }

    private static IEnumerable<PrerequisiteItem> GetPrerequisites()
    {
        yield return new PrerequisiteItem(".NET 8 SDK", "C# app", @"C:\Program Files\dotnet\ on PATH", "dotnet --info", "https://dotnet.microsoft.com/en-us/download/dotnet/8.0");
        yield return new PrerequisiteItem("Git for Windows", "PostDeploy", @"C:\Program Files\Git\cmd\git.exe on PATH", "git --version", "https://git-scm.com/install/windows");
        yield return new PrerequisiteItem("Python 3", "Python helper", @"py.exe launcher on PATH; optional .venv in repo", "py -3 --version", "https://www.python.org/downloads/windows/");
        yield return new PrerequisiteItem("PowerShell 7", "PowerCLI", @"C:\Program Files\PowerShell\7\pwsh.exe", "pwsh -NoLogo -Command $PSVersionTable.PSVersion", "https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.5");
        yield return new PrerequisiteItem("VMware PowerCLI", "vSphere", @"%USERPROFILE%\Documents\PowerShell\Modules", "Get-Module -ListAvailable VMware.PowerCLI", "https://developer.broadcom.com/powercli/installation-guide");
        yield return new PrerequisiteItem("powershell-yaml", "YAML", @"%USERPROFILE%\Documents\PowerShell\Modules", "Get-Command ConvertFrom-Yaml", "https://www.powershellgallery.com/packages/powershell-yaml/");
        yield return new PrerequisiteItem("UnattendXmlBuilder", "Windows answer files", @"%USERPROFILE%\Documents\PowerShell\Modules", "Get-Module -ListAvailable UnattendXmlBuilder", "https://www.powershellgallery.com/");
        yield return new PrerequisiteItem("Terraform", "Terraform path", @"C:\Tools\Terraform\terraform.exe on PATH", "terraform version", "https://developer.hashicorp.com/terraform/install");
        yield return new PrerequisiteItem("kubectl", "Kubernetes path", @"kubectl.exe on PATH and kubeconfig under %USERPROFILE%\.kube", "kubectl version --client", "https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/");
        yield return new PrerequisiteItem("PyYAML", "Python YAML", @".venv\Lib\site-packages", "py -3 -c \"import yaml; print(yaml.__version__)\"", "https://pypi.org/project/PyYAML/");
    }

    private void BrowseProject()
    {
        using var dialog = new FolderBrowserDialog { SelectedPath = ProjectRoot, Description = "Select the Multi_Install_ISO project folder" };
        if (dialog.ShowDialog(this) == DialogResult.OK)
        {
            _projectPathText.Text = dialog.SelectedPath;
            _definitionPathText.Text = PickDefaultDefinition(dialog.SelectedPath);
            _artifactPathText.Text = Path.Combine(dialog.SelectedPath, "artifacts");
            LoadCurrentDefinitionIntoEditor();
            ValidateDefinition();
        }
    }

    private void BrowseDefinition()
    {
        using var dialog = new OpenFileDialog
        {
            InitialDirectory = Directory.Exists(ProjectRoot) ? ProjectRoot : Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
            Filter = "Definition files|*.yml;*.yaml;*.json;*.csv|All files|*.*",
            FileName = _definitionPathText.Text
        };
        if (dialog.ShowDialog(this) == DialogResult.OK)
        {
            _definitionPathText.Text = dialog.FileName;
            LoadCurrentDefinitionIntoEditor();
            ValidateDefinition();
        }
    }

    private void LoadCurrentDefinitionIntoEditor()
    {
        _editorIssues.Items.Clear();
        if (!File.Exists(_definitionPathText.Text))
        {
            _definitionEditorText.Text = GetEditorTemplateText();
            _editorIssues.Items.Add("Current definition file does not exist. Insert or save a template to start.");
            return;
        }

        _definitionEditorText.Text = File.ReadAllText(_definitionPathText.Text);
        _editorIssues.Items.Add($"Loaded {_definitionPathText.Text}");
    }

    private void InsertEditorTemplate()
    {
        _definitionEditorText.Text = GetEditorTemplateText();
        _editorIssues.Items.Clear();
        _editorIssues.Items.Add($"Inserted {_editorTemplateCombo.SelectedItem} template.");
    }

    private void SaveEditorContent()
    {
        var path = _definitionPathText.Text;
        if (string.IsNullOrWhiteSpace(path) || Directory.Exists(path))
        {
            SaveEditorContentAs();
            return;
        }

        File.WriteAllText(path, _definitionEditorText.Text);
        _editorIssues.Items.Clear();
        _editorIssues.Items.Add($"Saved {path}");
        ValidateDefinition();
    }

    private void SaveEditorContentAs()
    {
        using var dialog = new SaveFileDialog
        {
            InitialDirectory = Directory.Exists(ProjectRoot) ? ProjectRoot : Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
            Filter = "YAML files|*.yaml;*.yml|JSON files|*.json|CSV files|*.csv|Terraform tfvars JSON|*.tfvars.json|All files|*.*",
            FileName = SuggestedDefinitionFileName()
        };

        if (dialog.ShowDialog(this) != DialogResult.OK)
        {
            return;
        }

        File.WriteAllText(dialog.FileName, _definitionEditorText.Text);
        _definitionPathText.Text = dialog.FileName;
        _editorIssues.Items.Clear();
        _editorIssues.Items.Add($"Saved {dialog.FileName}");
        ValidateDefinition();
    }

    private void ValidateEditorContent()
    {
        _editorIssues.Items.Clear();
        var extension = GetEditorValidationExtension();
        var tempPath = Path.Combine(Path.GetTempPath(), $"multi-install-iso-{Guid.NewGuid():N}{extension}");

        try
        {
            File.WriteAllText(tempPath, _definitionEditorText.Text);
            var result = DefinitionParser.Parse(tempPath);
            _editorIssues.Items.Add($"{result.Vms.Count} VM/pod row(s) detected. {result.Findings.Count} issue(s).");
            foreach (var finding in result.Findings)
            {
                _editorIssues.Items.Add($"{finding.Severity}: {finding.Message} {finding.Detail}".Trim());
            }
        }
        catch (Exception ex)
        {
            _editorIssues.Items.Add(ex.Message);
        }
        finally
        {
            try
            {
                File.Delete(tempPath);
            }
            catch
            {
                // Temporary validation cleanup is best effort.
            }
        }
    }

    private void FormatEditorJson()
    {
        _editorIssues.Items.Clear();
        try
        {
            using var document = JsonDocument.Parse(_definitionEditorText.Text, new JsonDocumentOptions { AllowTrailingCommas = true });
            _definitionEditorText.Text = JsonSerializer.Serialize(document.RootElement, new JsonSerializerOptions { WriteIndented = true });
            _editorIssues.Items.Add("JSON formatted.");
        }
        catch (Exception ex)
        {
            _editorIssues.Items.Add($"JSON format failed: {ex.Message}");
        }
    }

    private void UpdateEditorTips()
    {
        _definitionTipsText.Text = GetEditorTipsText();
    }

    private string GetEditorValidationExtension()
    {
        var selected = _editorTemplateCombo.SelectedItem?.ToString() ?? "";
        if (selected.Contains("CSV", StringComparison.OrdinalIgnoreCase))
        {
            return ".csv";
        }

        if (selected.Contains("JSON", StringComparison.OrdinalIgnoreCase))
        {
            return ".json";
        }

        var fromPath = Path.GetExtension(_definitionPathText.Text);
        return string.IsNullOrWhiteSpace(fromPath) ? ".yaml" : fromPath;
    }

    private string SuggestedDefinitionFileName()
    {
        return (_editorTemplateCombo.SelectedItem?.ToString()) switch
        {
            "PowerCLI JSON" => "cluster-vms.json",
            "PowerCLI CSV" => "cluster-vms.csv",
            "Terraform tfvars JSON" => "terraform.tfvars.json",
            "Kubernetes pods JSON" => "windows-pods.json",
            _ => "cluster-vms.yaml"
        };
    }

    private string GetEditorTemplateText()
    {
        return (_editorTemplateCombo.SelectedItem?.ToString()) switch
        {
            "PowerCLI JSON" => """
{
  "vms": [
    {
      "vmname": "iis-web-01",
      "iso": "\\\\storage\\isos\\en_windows_server_2022_x64.iso",
      "os": "windows2019Server64Guest",
      "cpu": 4,
      "ramGB": 8,
      "diskGB": 60,
      "datastore": "datastore1",
      "network": "VM Network",
      "ip": "192.168.10.11",
      "subnet": "255.255.255.0",
      "gateway": "192.168.10.1",
      "dns": ["192.168.10.10", "8.8.8.8"],
      "roles": ["IIS"]
    }
  ]
}
""",
            "PowerCLI CSV" => """
vmname,iso,os,cpu,ramGB,diskGB,datastore,network,ip,subnet,gateway,dns,roles
iis-web-01,\\storage\isos\en_windows_server_2022_x64.iso,windows2019Server64Guest,4,8,60,datastore1,VM Network,192.168.10.11,255.255.255.0,192.168.10.1,192.168.10.10,IIS
""",
            "Terraform tfvars JSON" => """
{
  "vsphere_server": "vcenter.contoso.local",
  "allow_unverified_ssl": true,
  "datacenter": "Datacenter",
  "cluster": "Cluster",
  "folder": "vm/dev",
  "vms": [
    {
      "name": "tf-web-01",
      "num_cpus": 2,
      "memory": 4096,
      "disk_size": 50,
      "datastore": "datastore1",
      "network": "VM Network",
      "guest_id": "windows2019Server64Guest",
      "iso_path": "[datastore1] ISOs/en_windows_server_2022.iso",
      "firmware": "efi"
    }
  ]
}
""",
            "Kubernetes pods JSON" => """
{
  "pods": [
    {
      "name": "win-webserver",
      "image": "mcr.microsoft.com/windows/servercore/iis:windowsservercore-ltsc2019",
      "ports": [
        { "containerPort": 80, "hostPort": 8080 }
      ],
      "env": [
        { "name": "ASPNETCORE_ENVIRONMENT", "value": "Development" }
      ],
      "volumes": [
        { "name": "data", "hostPath": { "path": "C:\\data" } }
      ]
    }
  ]
}
""",
            _ => """
vms:
  - vmname: "iis-web-01"
    description: "IIS frontend server 1"
    iso: '\\storage\isos\en_windows_server_2022_x64.iso'
    os: "windows2019Server64Guest"
    cpu: 4
    ramGB: 8
    diskGB: 60
    datastore: "datastore1"
    network: "VM Network"
    ip: "192.168.10.11"
    subnet: "255.255.255.0"
    gateway: "192.168.10.1"
    dns: ["192.168.10.10", "8.8.8.8"]
    domain: "contoso.local"
    roles: ["IIS"]
    codeRepo: "https://dev.azure.com/yourorg/yourproject/_git/webapp"
    appPoolName: "WebAppPool"
    siteName: "WebSite"
"""
        };
    }

    private string GetEditorTipsText()
    {
        return (_editorTemplateCombo.SelectedItem?.ToString()) switch
        {
            "PowerCLI CSV" => """
CSV CHEAT SHEET

Use one header row. Every VM is one row.

Required columns:
vmname, os, cpu, ramGB, diskGB, datastore, network

Helpful columns:
iso, ip, subnet, gateway, dns, domain, roles, codeRepo

Common oops:
- Do not add comments above the header.
- Quote values that contain commas.
- Keep roles simple, like IIS or API.
- CSV is easiest for experts doing bulk spreadsheet edits.
""",
            "PowerCLI JSON" => """
JSON CHEAT SHEET

Shape:
{ "vms": [ { ... } ] }

Required keys:
vmname, os, cpu, ramGB, diskGB, datastore, network

Common oops:
- No # comments in JSON.
- Escape backslashes: "\\\\server\\share\\file.iso".
- Arrays need commas between values.
- Use Format JSON after pasting.
""",
            "Terraform tfvars JSON" => """
TERRAFORM CHEAT SHEET

This feeds main.tf, not Build-Cluster.ps1.

VM keys:
name, num_cpus, memory, disk_size, datastore,
network, guest_id, iso_path

Memory is MB in Terraform.
Disk is GB.
ISO path is datastore style:
[datastore1] ISOs/windows.iso

Put vsphere_user and vsphere_password in environment
variables or pipeline secrets, not this file.
""",
            "Kubernetes pods JSON" => """
KUBERNETES CHEAT SHEET

This feeds Pod-Power.ps1.

Shape:
{ "pods": [ { ... } ] }

Required pod keys:
name, image

Helpful keys:
ports, env, volumes

Windows pods need matching Windows node support.
Host paths use escaped backslashes in JSON:
"C:\\data"
""",
            _ => """
YAML CHEAT SHEET

Use two spaces per indent. Do not use tabs.

Required VM keys:
vmname
os
cpu
ramGB
diskGB
datastore
network

Helpful keys:
iso, ip, subnet, gateway, dns, domain,
roles, codeRepo, appPoolName, siteName

Common oops:
- Lists start with "- " under vms:
- Keep key names consistent: ramGB, not ramgb.
- Quote Windows paths with single quotes.
- Do not put secrets in the file.
- If YAML feels fussy, use JSON or CSV.
"""
        };
    }

    private void OpenSelectedAuditFile()
    {
        if (_auditList.SelectedItems.Count == 0 || _auditList.SelectedItems[0].Tag is not AuditFinding finding)
        {
            return;
        }

        OpenFile(finding.File);
    }

    private void OpenSelectedPrereqLink()
    {
        if (_prereqList.SelectedItems.Count == 0 || _prereqList.SelectedItems[0].Tag is not PrerequisiteItem item)
        {
            return;
        }

        Process.Start(new ProcessStartInfo(item.Url) { UseShellExecute = true });
    }

    private static void OpenFolder(string path)
    {
        if (Directory.Exists(path))
        {
            Process.Start(new ProcessStartInfo("explorer.exe", path) { UseShellExecute = true });
        }
    }

    private static void OpenFile(string path)
    {
        if (File.Exists(path))
        {
            if (Path.GetExtension(path).Equals(".md", StringComparison.OrdinalIgnoreCase))
            {
                new GuideViewerForm(path).Show();
                return;
            }

            Process.Start(new ProcessStartInfo(path) { UseShellExecute = true });
        }
    }

    private void AppendLog(string text)
    {
        if (InvokeRequired)
        {
            BeginInvoke(() => AppendLog(text));
            return;
        }

        _logText.AppendText(text + Environment.NewLine);
    }

    private void SetBusy(bool busy, string status)
    {
        if (InvokeRequired)
        {
            BeginInvoke(() => SetBusy(busy, status));
            return;
        }

        _startButton.Enabled = !busy;
        _stopButton.Enabled = busy;
        _statusLabel.Text = status;
    }

    private string ProjectRoot => _projectPathText.Text.Trim();

    private static void ApplyDarkTheme(Control root)
    {
        root.BackColor = DarkBack;
        root.ForeColor = DarkText;

        foreach (Control control in root.Controls)
        {
            ApplyDarkTheme(control);
        }

        switch (root)
        {
            case Button button:
                button.FlatStyle = FlatStyle.Flat;
                button.FlatAppearance.BorderColor = Color.FromArgb(70, 78, 94);
                button.BackColor = DarkPanelAlt;
                button.ForeColor = DarkText;
                break;
            case TextBox textBox:
                textBox.BackColor = DarkPanel;
                textBox.ForeColor = DarkText;
                textBox.BorderStyle = BorderStyle.FixedSingle;
                break;
            case ComboBox comboBox:
                comboBox.BackColor = DarkPanel;
                comboBox.ForeColor = DarkText;
                comboBox.FlatStyle = FlatStyle.Flat;
                break;
            case ListBox listBox:
                listBox.BackColor = DarkPanel;
                listBox.ForeColor = DarkText;
                break;
            case ListView listView:
                listView.BackColor = DarkPanel;
                listView.ForeColor = DarkText;
                listView.BorderStyle = BorderStyle.FixedSingle;
                break;
            case DataGridView grid:
                grid.BackgroundColor = DarkPanel;
                grid.GridColor = Color.FromArgb(62, 70, 84);
                grid.BorderStyle = BorderStyle.FixedSingle;
                grid.EnableHeadersVisualStyles = false;
                grid.ColumnHeadersDefaultCellStyle.BackColor = DarkPanelAlt;
                grid.ColumnHeadersDefaultCellStyle.ForeColor = DarkText;
                grid.RowHeadersDefaultCellStyle.BackColor = DarkPanelAlt;
                grid.DefaultCellStyle.BackColor = DarkPanel;
                grid.DefaultCellStyle.ForeColor = DarkText;
                grid.DefaultCellStyle.SelectionBackColor = Color.FromArgb(48, 88, 130);
                grid.DefaultCellStyle.SelectionForeColor = Color.White;
                break;
            case TabControl tabControl:
                tabControl.BackColor = DarkBack;
                tabControl.ForeColor = DarkText;
                break;
            case TabPage tabPage:
                tabPage.BackColor = DarkBack;
                tabPage.ForeColor = DarkText;
                break;
            case Label label:
                label.ForeColor = label.ForeColor == SystemColors.GrayText ? DarkMuted : DarkText;
                break;
        }
    }

    private static string ResolveProjectRoot(string? specified)
    {
        if (!string.IsNullOrWhiteSpace(specified) && Directory.Exists(specified))
        {
            return Path.GetFullPath(specified);
        }

        var directory = new DirectoryInfo(AppContext.BaseDirectory);
        while (directory is not null)
        {
            if (File.Exists(Path.Combine(directory.FullName, "README.md")) && File.Exists(Path.Combine(directory.FullName, "Get-WindowsISO.ps1")))
            {
                return directory.FullName;
            }

            directory = directory.Parent;
        }

        return Environment.CurrentDirectory;
    }

    private static string PickDefaultDefinition(string root)
    {
        foreach (var candidate in new[] { "cluster-vms.yaml", "local-vms.yml", "local-vms.yaml", "vms.json", "terraform.tfvars.json" })
        {
            var path = Path.Combine(root, candidate);
            if (File.Exists(path))
            {
                return path;
            }
        }

        return root;
    }

    private static string TryMakeRelative(string root, string path)
    {
        try
        {
            if (Path.IsPathFullyQualified(path) && Directory.Exists(root))
            {
                return Path.GetRelativePath(root, path);
            }
        }
        catch
        {
            // Fall through to original path.
        }

        return path;
    }

    private static string EscapePowerShellPath(string path) => path.Replace("'", "''");

    private static List<string> SplitArguments(string commandLine)
    {
        var result = new List<string>();
        var current = new List<char>();
        var inQuotes = false;

        for (var i = 0; i < commandLine.Length; i++)
        {
            var c = commandLine[i];
            if (c == '"')
            {
                inQuotes = !inQuotes;
                continue;
            }

            if (char.IsWhiteSpace(c) && !inQuotes)
            {
                Flush();
                continue;
            }

            current.Add(c);
        }

        Flush();
        return result;

        void Flush()
        {
            if (current.Count == 0)
            {
                return;
            }

            result.Add(new string(current.ToArray()));
            current.Clear();
        }
    }
}
