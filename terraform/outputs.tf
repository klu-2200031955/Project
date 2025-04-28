output "instance_public_ip" {
  value = aws_instance.mern_app.public_ip
}
