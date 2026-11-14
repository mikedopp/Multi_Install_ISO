#Requires -Version 7.0

Describe 'Build-Cluster offline planning' {
    BeforeAll {
        $script:RepoRoot = Split-Path -Parent $PSScriptRoot
        $script:BuildScript = Join-Path $script:RepoRoot 'Build-Cluster.ps1'
    }

    It 'plans the four-node YAML definition when powershell-yaml is installed' -Skip:(-not (Get-Module -ListAvailable -Name powershell-yaml)) {
        $artifactRoot = Join-Path $TestDrive 'yaml-plan'
        $isoCache = Join-Path $artifactRoot 'isos'

        & pwsh -NoProfile -File $script:BuildScript `
            -DefinitionPath (Join-Path $script:RepoRoot 'cluster-vms.yaml') `
            -ArtifactRoot $artifactRoot `
            -IsoCachePath $isoCache `
            -PlanOnly

        $LASTEXITCODE | Should -Be 0
        $planFile = Get-ChildItem -LiteralPath $artifactRoot -Recurse -File -Filter 'build-plan.json' |
            Select-Object -First 1
        $planFile | Should -Not -BeNullOrEmpty

        $plan = Get-Content -LiteralPath $planFile.FullName -Raw | ConvertFrom-Json
        $plan.mode | Should -Be 'PlanOnly'
        @($plan.vms).Count | Should -Be 4
        @($plan.vms.name) | Should -Be @('iis-web-01', 'iis-web-02', 'api-app-01', 'api-app-02')
        @($plan.vms | Where-Object { @($_.issues).Count -gt 0 }).Count | Should -Be 0
    }

    It 'preserves JSON planning behavior' {
        $artifactRoot = Join-Path $TestDrive 'json-plan'
        $isoCache = Join-Path $artifactRoot 'isos'

        & pwsh -NoProfile -File $script:BuildScript `
            -DefinitionPath (Join-Path $script:RepoRoot 'templates\powercli-vms.json') `
            -ArtifactRoot $artifactRoot `
            -IsoCachePath $isoCache `
            -PlanOnly

        $LASTEXITCODE | Should -Be 0
        $planFile = Get-ChildItem -LiteralPath $artifactRoot -Recurse -File -Filter 'build-plan.json' |
            Select-Object -First 1
        $planFile | Should -Not -BeNullOrEmpty

        $plan = Get-Content -LiteralPath $planFile.FullName -Raw | ConvertFrom-Json
        $plan.mode | Should -Be 'PlanOnly'
        @($plan.vms).Count | Should -Be 1
        @($plan.vms[0].issues).Count | Should -Be 0
    }
}
