# Set your Azure DevOps PAT as an environment variable (safer)
$env:AZURE_DEVOPS_PAT = "your-personal-access-token"

# Run the master script
.\Build-Cluster.ps1 -YamlPath .\cluster-vms.yaml -AzureDevOpsPat $env:AZURE_DEVOPS_PAT
