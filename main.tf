#main tf build
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
  }))
}

resource "vsphere_virtual_machine" "vm" {
  for_each = { for idx, vm in var.vms : idx => vm }

  name             = each.value.name
  resource_pool_id = data.vsphere_resource_pool.pool.id
  datastore_id     = data.vsphere_datastore.ds[each.value.datastore].id
  num_cpus         = each.value.num_cpus
  memory           = each.value.memory
  guest_id         = each.value.guest_id

  network_interface {
    network_id = data.vsphere_network.net[each.value.network].id
  }

  disk {
    label = "disk0"
    size  = each.value.disk_size
  }

  cdrom {
    client_device = true
    datastore_id  = data.vsphere_datastore.ds[each.value.datastore].id
    path          = each.value.iso_path
  }
}
