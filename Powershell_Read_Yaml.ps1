Install-Module -Name powershell-yaml -Force -Scope CurrentUser

#example code to Read in
#$vms = Read-VmDefinition -Path 'C:\config\vms.yaml'
#$vms.vms | ForEach-Object { Write-Host "VM: $($_.vmname)" }
