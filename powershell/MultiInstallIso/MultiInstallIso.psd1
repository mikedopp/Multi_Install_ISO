@{
    RootModule        = 'MultiInstallIso.psm1'
    ModuleVersion     = '0.9.0'
    GUID              = '6f1d3a52-6c5e-4a0e-9a54-2b7c0e4d9b31'
    Author            = 'mikedopp'
    Copyright         = '(c) 2019-2026 mikedopp. MIT License.'
    Description       = 'Plan, build answer media for, and guardedly provision VMs from installation ISOs.'
    PowerShellVersion = '7.2'
    FunctionsToExport = @(
        'ConvertFrom-MiiYaml', 'Read-MiiDefinition', 'ConvertTo-MiiVm', 'Test-MiiVmSet', 'Get-MiiKnownGuestId',
        'New-MiiPlan', 'Read-MiiPlan', 'New-MiiUnattendXml', 'New-MiiKickstart',
        'New-MiiIsoImage', 'Get-MiiIsoInfo', 'Read-MiiIsoFile', 'Get-MiiWimImageList',
        'New-MiiAnswerMedia', 'Test-MiiAnswerMedia', 'Remove-MiiAnswerMedia',
        'Test-MiiInstallMedia', 'Import-MiiInstallMedia',
        'Invoke-MiiApply', 'New-MiiVSphereProvider', 'New-MiiHyperVProvider',
        'Get-MiiDependencyMap'
    )
    CmdletsToExport   = @()
    VariablesToExport = @()
    AliasesToExport   = @()
}
