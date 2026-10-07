#Requires -Version 7.2
Set-StrictMode -Version 3.0

foreach ($file in 'Yaml', 'Definition', 'Plan', 'AnswerFiles', 'Iso', 'Media', 'Providers', 'Apply', 'Dependencies') {
    . (Join-Path $PSScriptRoot "Private\$file.ps1")
}

Export-ModuleMember -Function @(
    'ConvertFrom-MiiYaml'
    'Read-MiiDefinition'
    'ConvertTo-MiiVm'
    'Test-MiiVmSet'
    'Get-MiiKnownGuestId'
    'New-MiiPlan'
    'Read-MiiPlan'
    'New-MiiUnattendXml'
    'New-MiiKickstart'
    'New-MiiIsoImage'
    'Get-MiiIsoInfo'
    'Read-MiiIsoFile'
    'Get-MiiWimImageList'
    'New-MiiAnswerMedia'
    'Test-MiiAnswerMedia'
    'Remove-MiiAnswerMedia'
    'Test-MiiInstallMedia'
    'Import-MiiInstallMedia'
    'Invoke-MiiApply'
    'New-MiiVSphereProvider'
    'New-MiiHyperVProvider'
    'Get-MiiDependencyMap'
)
