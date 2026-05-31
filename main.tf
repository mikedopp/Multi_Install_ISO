terraform {
  required_version = ">= 1.6.0"

  required_providers {
    vsphere = {
      source  = "hashicorp/vsphere"
      version = "~> 2.10"
    }
  }
}

variable "vsphere_server" {
  type = string
}

variable "vsphere_user" {
  type      = string
  sensitive = true
  nullable  = true
  default   = null
}

variable "vsphere_password" {
  type      = string
  sensitive = true
  nullable  = true
  default   = null
}

variable "allow_unverified_ssl" {
  type    = bool
  default = true
}

variable "datacenter" {
  type = string
}

variable "cluster" {
  type = string
}

variable "folder" {
  type    = string
  default = null
}

variable "vms" {
  type = list(object({
    name       = string
    num_cpus   = number
    memory     = number
    disk_size  = number
    datastore  = string
    network    = string
    guest_id   = string
    iso_path   = string
    firmware   = optional(string, "efi")
  }))
}

provider "vsphere" {
  user                 = var.vsphere_user
  password             = var.vsphere_password
  vsphere_server       = var.vsphere_server
  allow_unverified_ssl = var.allow_unverified_ssl
}

data "vsphere_datacenter" "dc" {
  name = var.datacenter
}

data "vsphere_compute_cluster" "cluster" {
  name          = var.cluster
  datacenter_id = data.vsphere_datacenter.dc.id
}

data "vsphere_datastore" "ds" {
  for_each      = toset(distinct([for vm in var.vms : vm.datastore]))
  name          = each.value
  datacenter_id = data.vsphere_datacenter.dc.id
}

data "vsphere_network" "net" {
  for_each      = toset(distinct([for vm in var.vms : vm.network]))
  name          = each.value
  datacenter_id = data.vsphere_datacenter.dc.id
}

resource "vsphere_virtual_machine" "vm" {
  for_each = { for vm in var.vms : vm.name => vm }

  name             = each.value.name
  folder           = var.folder
  resource_pool_id = data.vsphere_compute_cluster.cluster.resource_pool_id
  datastore_id     = data.vsphere_datastore.ds[each.value.datastore].id
  num_cpus         = each.value.num_cpus
  memory           = each.value.memory
  guest_id         = each.value.guest_id
  firmware         = each.value.firmware

  network_interface {
    network_id = data.vsphere_network.net[each.value.network].id
  }

  disk {
    label = "disk0"
    size  = each.value.disk_size
  }

  cdrom {
    datastore_id = data.vsphere_datastore.ds[each.value.datastore].id
    path         = each.value.iso_path
  }
}
