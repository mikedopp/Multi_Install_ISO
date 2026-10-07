# Guarded apply. Every VM runs the same step sequence and writes a receipt after each
# step, so a failure leaves an exact record of what changed. The first failure stops the
# run; nothing is rolled back or deleted automatically.

$script:MiiApplySteps = @('Preflight', 'CreateVm', 'AttachMedia', 'Readback', 'PowerOn')

function Save-MiiJson {
    param([object]$Object, [string]$Path)
    [IO.File]::WriteAllText($Path, ($Object | ConvertTo-Json -Depth 12), [Text.UTF8Encoding]::new($false))
}

function Invoke-MiiApply {
    <#
    .SYNOPSIS
        Builds the VMs of a reviewed plan, one at a time, with per-VM receipts.
    .PARAMETER PlanHash
        The SHA-256 of build-plan.json as reviewed. The run is refused if the file differs.
    .PARAMETER ConfirmTarget
        Must equal the target identity: the vCenter server name, or this computer's name
        for Hyper-V. It stops a plan reviewed for one target from running against another.
    .PARAMETER Provider
        Test seam: a hashtable of provider script blocks. Normal runs leave it empty.
    #>
    [CmdletBinding(SupportsShouldProcess, ConfirmImpact = 'High')]
    param(
        [Parameter(Mandatory)][string]$PlanPath,
        [Parameter(Mandatory)][string]$PlanHash,
        [Parameter(Mandatory)][string]$ConfirmTarget,
        [string]$VcenterServer,
        [pscredential]$VcenterCredential,
        [string]$VcenterCluster,
        [string]$HyperVPath,
        [string[]]$VmName,
        [switch]$NoPowerOn,
        [hashtable]$Provider
    )

    $loaded = Read-MiiPlan -PlanPath $PlanPath -ExpectedHash $PlanHash
    $plan = $loaded.Plan
    if (-not $plan.summary.ready) { throw "The plan has $($plan.summary.blockingIssues) blocking issue(s); apply is refused." }

    $target = $plan.target.kind
    if (-not $Provider) {
        $options = @{
            VcenterServer = $(if ($VcenterServer) { $VcenterServer } else { $plan.target.vcenterServer })
            VcenterCluster = $(if ($VcenterCluster) { $VcenterCluster } else { $plan.target.vcenterCluster })
            VcenterCredential = $VcenterCredential
            HyperVPath = $HyperVPath
        }
        $Provider = switch ($target) {
            'vsphere' { New-MiiVSphereProvider -Options $options }
            'hyperv' { New-MiiHyperVProvider -Options $options }
            default { throw "Plan target '$target' has no apply provider." }
        }
    }
    if ($ConfirmTarget -ne $Provider.Identity) {
        throw "ConfirmTarget '$ConfirmTarget' does not match the target '$($Provider.Identity)'. Apply is refused."
    }

    $vms = @($plan.vms | Where-Object { -not $VmName -or $_.name -in $VmName })
    if ($vms.Count -eq 0) { throw 'No planned VMs match the requested names.' }

    # Answer media must exist and still match its manifest.
    $media = @{}
    $mediaCheck = @(Test-MiiAnswerMedia -RunDirectory $loaded.RunDirectory)
    foreach ($vm in $vms) {
        $m = $mediaCheck | Where-Object Vm -eq $vm.name
        if (-not $m) { throw "No answer media for $($vm.name). Build it with -Mode Media first." }
        if ($m.Status -ne 'PASS') { throw "Answer media for $($vm.name) failed verification: $($m.Problems -join ' ')" }
        $media[$vm.name] = $m.Path
    }

    if (-not $PSCmdlet.ShouldProcess("$($vms.Count) VM(s) on $($Provider.Identity)", 'Create and power on')) { return }

    $stamp = (Get-Date).ToString('yyyyMMdd-HHmmss')
    $applyDir = Join-Path $loaded.RunDirectory "apply-$stamp"
    New-Item -ItemType Directory -Path $applyDir -Force | Out-Null

    # The attempt record is written before anything touches the target.
    $attempt = [ordered]@{
        schema    = 'multi-install-iso.apply-attempt.v1'
        planHash  = $loaded.PlanHash
        planPath  = $loaded.PlanPath
        target    = [ordered]@{ kind = $target; identity = $Provider.Identity }
        operator  = "$env:USERDOMAIN\$env:USERNAME"
        startedAt = (Get-Date).ToUniversalTime().ToString('o')
        vms       = @($vms.name)
        powerOn   = -not $NoPowerOn
    }
    Save-MiiJson $attempt (Join-Path $applyDir 'apply-attempt.json')

    $ctx = @{ Provider = $Provider; AnswerMedia = $media; State = @{}; NoPowerOn = [bool]$NoPowerOn }
    $results = New-Object System.Collections.Generic.List[object]
    $runStatus = 'SUCCESS'
    $connected = $false
    try {
        try { & $Provider.Connect $ctx; $connected = $true }
        catch {
            $runStatus = 'FAILED'
            $results.Add([ordered]@{ vm = $null; status = 'FAILED'; error = "Connect: $($_.Exception.Message)" })
            throw
        }

        foreach ($vm in $vms) {
            $receiptPath = Join-Path $applyDir "receipt-$($vm.name).json"
            $receipt = [ordered]@{
                schema = 'multi-install-iso.vm-receipt.v1'; vm = $vm.name; planHash = $loaded.PlanHash
                target = $Provider.Identity; startedAt = (Get-Date).ToUniversalTime().ToString('o')
                status = 'RUNNING'; steps = @()
            }
            Save-MiiJson $receipt $receiptPath
            $ctx.State[$vm.name] = @{}

            foreach ($step in $script:MiiApplySteps) {
                if ($step -eq 'PowerOn' -and $NoPowerOn) {
                    $receipt.steps += [ordered]@{ step = $step; status = 'SKIPPED'; at = (Get-Date).ToUniversalTime().ToString('o'); detail = 'NoPowerOn' }
                    continue
                }
                try {
                    $detail = & $Provider[$step] $vm $ctx
                    $receipt.steps += [ordered]@{ step = $step; status = 'OK'; at = (Get-Date).ToUniversalTime().ToString('o'); detail = $detail }
                    Save-MiiJson $receipt $receiptPath
                }
                catch {
                    $receipt.steps += [ordered]@{ step = $step; status = 'FAILED'; at = (Get-Date).ToUniversalTime().ToString('o'); detail = $_.Exception.Message }
                    $receipt.status = 'FAILED'
                    $receipt.finishedAt = (Get-Date).ToUniversalTime().ToString('o')
                    $receipt.note = 'Nothing was rolled back. Inspect the target before retrying or cleaning up.'
                    Save-MiiJson $receipt $receiptPath
                    $results.Add([ordered]@{ vm = $vm.name; status = 'FAILED'; failedStep = $step; error = $_.Exception.Message; receipt = $receiptPath })
                    $runStatus = 'FAILED'
                    break
                }
            }
            if ($runStatus -eq 'FAILED') { break }

            $receipt.status = 'SUCCESS'
            $receipt.finishedAt = (Get-Date).ToUniversalTime().ToString('o')
            Save-MiiJson $receipt $receiptPath
            $results.Add([ordered]@{ vm = $vm.name; status = 'SUCCESS'; receipt = $receiptPath })
        }
    }
    finally {
        if ($connected) { try { & $Provider.Disconnect $ctx } catch { Write-Warning "Disconnect failed: $($_.Exception.Message)" } }
        $done = @($results | ForEach-Object { $_.vm })
        $notRun = @($vms.name | Where-Object { $_ -notin $done })
        if ($runStatus -eq 'SUCCESS' -and $notRun.Count -gt 0) { $runStatus = 'PARTIAL' }
        $summary = [ordered]@{
            schema     = 'multi-install-iso.run-summary.v1'
            planHash   = $loaded.PlanHash
            target     = $Provider.Identity
            status     = $runStatus
            finishedAt = (Get-Date).ToUniversalTime().ToString('o')
            results    = $results.ToArray()
            notRun     = $notRun
        }
        Save-MiiJson $summary (Join-Path $applyDir 'run-summary.json')
    }

    [pscustomobject]@{ ApplyDirectory = $applyDir; Status = $runStatus; Results = $results.ToArray() }
}
