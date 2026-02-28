
#using vms.yaml

# Inside the VM loop
if (-not $vm.iso -and $vm.os -match "windows") {
    $isoPath = "C:\ISOs\$($vm.vmname).iso"
    & .\Get-WindowsISO.ps1 -Edition $vm.edition -Language en-us -OutPath (Split-Path $isoPath)
    $vm.iso = $isoPath   # update the object for later use
}

# Generate answer files
if ($vm.os -match "windows") {
    & .\New-UnattendXml.ps1 -Path "C:\Temp\autounattend.xml" -ProductKey $vm.productKey -ComputerName $vm.vmname
}
elseif ($vm.os -match "linux") {
    & .\New-Kickstart.ps1 -Path "C:\Temp\ks.cfg" -RootPasswordHash $vm.rootPasswordHash
}
