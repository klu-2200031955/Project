#!/bin/bash

# Update and install packages
yum update -y
amazon-linux-extras enable docker
yum clean metadata
yum install -y docker git

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Add ec2-user to Docker group
usermod -aG docker ec2-user

# Install Docker Compose
DOCKER_COMPOSE_VERSION="v2.24.1"  # Optional: specify version
curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Clone project as ec2-user
sudo -u ec2-user git clone https://github.com/klu-2200031955/Project.git /home/ec2-user/Project

# Set ownership
chown -R ec2-user:ec2-user /home/ec2-user/Project

# Allow group changes to take effect without logout
# This runs commands inside a new group session
sudo -u ec2-user newgrp docker <<EOF
cd /home/ec2-user/Project
/usr/local/bin/docker-compose up -d
EOF
