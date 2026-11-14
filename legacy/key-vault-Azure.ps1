#PowerShell script snippet to enrich YAML with secrets
# Retrieve secrets from Azure KeyVault
$secretVaultName = "myVault"
$domainJoinUser = (Get-AzKeyVaultSecret -VaultName $secretVaultName -Name "domainJoinUser").SecretValueText
$domainJoinPass = (Get-AzKeyVaultSecret -VaultName $secretVaultName -Name "domainJoinPass").SecretValue

# Merge into the VM object
$vms = Read-VmDefinition -Path "C:\config\local-vms.yaml"
foreach ($vm in $vms.vms) {
    $vm | Add-Member -NotePropertyName "domainJoinUser" -NotePropertyValue $domainJoinUser
    $vm | Add-Member -NotePropertyName "domainJoinPass" -NotePropertyValue $domainJoinPass
}
