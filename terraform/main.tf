provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "mern_app" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_pair

  user_data = file("${path.module}/setup.sh")

  vpc_security_group_ids = [aws_security_group.mern_sg.id]

  tags = {
    Name = "Project"
  }
}

resource "aws_security_group" "mern_sg" {
  name        = "mern_sg"
  description = "Allow web traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 2023
    to_port     = 2023
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8081
    to_port     = 8081
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
