provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "sparks" {
  name     = "rg-sparks-fc"
  location = "West Europe"
}

resource "azurerm_virtual_network" "vnet" {
  name                = "vnet-sparks"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.sparks.location
  resource_group_name = azurerm_resource_group.sparks.name
}

resource "azurerm_subnet" "subnet" {
  name                 = "snet-web"
  resource_group_name  = azurerm_resource_group.sparks.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_public_ip" "pip" {
  name                = "pip-sparks"
  location            = azurerm_resource_group.sparks.location
  resource_group_name = azurerm_resource_group.sparks.name
  allocation_method   = "Static"
  domain_name_label   = "sparks-fc-musa"
}

resource "azurerm_network_security_group" "nsg" {
  name                = "nsg-sparks"
  location            = azurerm_resource_group.sparks.location
  resource_group_name = azurerm_resource_group.sparks.name

  security_rule {
    name                       = "SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "HTTP"
    priority                   = 1002
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

resource "azurerm_network_interface" "nic" {
  name                = "nic-sparks"
  location            = azurerm_resource_group.sparks.location
  resource_group_name = azurerm_resource_group.sparks.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.pip.id
  }
}

resource "azurerm_network_interface_security_group_association" "nsg_assoc" {
  network_interface_id      = azurerm_network_interface.nic.id
  network_security_group_id = azurerm_network_security_group.nsg.id
}

variable "ssh_public_key" {
  description = "Public SSH key for the VM"
}

resource "azurerm_linux_virtual_machine" "vm" {
  name                = "vm-sparks"
  resource_group_name = azurerm_resource_group.sparks.name
  location            = azurerm_resource_group.sparks.location
  size                = "Standard_B1s"
  admin_username      = "adminuser"
  network_interface_ids = [
    azurerm_network_interface.nic.id,
  ]

  admin_ssh_key {
    username   = "adminuser"
    public_key = trimspace(var.ssh_public_key)
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
}

variable "domain_name" {
  default = "sparks-fc.com"
}

resource "azurerm_dns_zone" "dns" {
  name                = var.domain_name
  resource_group_name = azurerm_resource_group.sparks.name
}

resource "azurerm_dns_a_record" "record" {
  name                = "@"
  zone_name           = azurerm_dns_zone.dns.name
  resource_group_name = azurerm_resource_group.sparks.name
  ttl                 = 300
  records             = [azurerm_public_ip.pip.ip_address]
}

resource "azurerm_dns_a_record" "www" {
  name                = "www"
  zone_name           = azurerm_dns_zone.dns.name
  resource_group_name = azurerm_resource_group.sparks.name
  ttl                 = 300
  records             = [azurerm_public_ip.pip.ip_address]
}

output "name_servers" {
  value = azurerm_dns_zone.dns.name_servers
}
