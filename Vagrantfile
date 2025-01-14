# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    # Specify the Vagrant box to use
    config.vm.box = "geerlingguy/ubuntu2004"
  
    config.vm.network "private_network", type: "dhcp"
  
    # Guest port 3000 is forwarded to host port 3000
    config.vm.network "forwarded_port", guest: 3000, host: 3000
  
    # Configure the VirtualBox provider to allocate resources to the VM
    config.vm.provider "virtualbox" do |vb|
      vb.memory = "1024" # Set memory to 1GB
      vb.cpus = 2        # Allocate 2 CPUs
    end
  
     # Install Ansible (if not already installed in the base box)
    config.vm.provision "shell", inline: <<-SHELL
      sudo apt update
      sudo apt install -y ansible
    SHELL
 
    config.vm.provision "ansible" do |ansible|
      ansible.playbook = "ansible/playbook.yaml"
      ansible.inventory_path = "ansible/inventory.yaml"
      ansible.become = true  # Elevate privileges to root (sudo)
 
      ansible.verbose = "v"
      ansible.limit = "myserver"  # Ensure it limits to myserver
    end
  
    # Share the project directory with the VM for easy access to code
    config.vm.synced_folder ".", "/vagrant", type: "virtualbox"
  end
  