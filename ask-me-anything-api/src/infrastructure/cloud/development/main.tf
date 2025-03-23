terraform {
  required_version = ">= 1.2.0"
  backend "s3" {
    bucket = "ask-me-anything-state-bucket"
    key    = "ask-me-anything-api/main.tfstate"
    region = "us-east-1"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.16.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "ask_me_anything_api_instance_development" {
  ami                    = "ami-08b5b3a93ed654d19"
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.ask_me_anything_api_security_group_development.id]
}

resource "aws_security_group" "ask_me_anything_api_security_group_development" {
  name        = "ask_me_anything_api_security_group_development"
  description = "Security group that allows inbound HTTP traffic on port 3000"

  ingress {
    description = "Allow incoming HTTP traffic from any IP (0.0.0.0/0) on port 3000"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
  }

  egress {
    description = "Allow all outbound traffic to any IP and port"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
  }

  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_ecr_repository" "ask_me_anything_api_ecr_repository_development" {
  name                 = "ask-me-anything-api-ecr-repository-development"
  image_tag_mutability = "MUTABLE"
  lifecycle {
    prevent_destroy = false
  }
}
