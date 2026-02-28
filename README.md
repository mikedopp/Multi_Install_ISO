# Multi_Install_ISO
The Engine or glue that pollutes vsphere with new servers. 

allows for Vm's to be spun up using Microsoft ISO's (The plan is to download "fresh" windows ISO's from MSDN or microsoft download.)
Place them in a datastore. We used VMware or Vsphere as the project was created with Vsphere in mind at the time. *This needs to be remediated"

Your automation (PowerShell script) reads the definition (YAML/JSON), then:

1. Connects to vCenter (if VMware). 

2. Creates an empty VM with the specified hardware. <- Pod or Teraform location

3. Mounts the ISO (from a network share or datastore). <- Network store for sure

4. Starts the VM, which boots from the ISO.

4. Performs an unattended installation using an answer file (e.g., autounattend.xml for Windows, kickstart for Linux) that you either inject via floppy or embed in the ISO. <- need to be added

5. Applies post‑install configurations (domain join, feature installation) via PowerShell remoting or guest customization.

6. For Kubernetes pods, the process is different: the definition is used to generate a pod spec and apply it to the cluster (via kubectl apply).

This approach gives you complete control over the OS and software from scratch—ideal for creating fresh, consistent environments for development or testing.
