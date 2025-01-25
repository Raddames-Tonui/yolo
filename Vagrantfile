# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Specify the Vagrant box to use
  config.vm.box = "geerlingguy/ubuntu2004"

  # Set up a private network with DHCP
  config.vm.network "private_network", type: "dhcp"

  # Forward guest port 3000 to host port 3000
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  # Configure the VirtualBox provider for VM resources
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = 2       
  end

  # Provision with a shell script to install Ansible
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt update
    sudo apt install -y ansible
  SHELL

  # Use Ansible provisioner
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "ansible/playbook.yaml"
    ansible.inventory_path = "ansible/inventory.yaml"

    # Enable privilege escalation (equivalent to --become)
    ansible.become = true 

    # Set verbosity for detailed output
    ansible.verbose = "v"

    # Limit execution to a specific group or host
    ansible.limit = "myserver"
  end

  # Share the project directory with the VM
  config.vm.synced_folder ".", "/vagrant", type: "virtualbox"
end
