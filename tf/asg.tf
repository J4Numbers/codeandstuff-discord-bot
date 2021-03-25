resource "aws_launch_configuration" "cas-discord-asg-lc" {
  name                 = "cas-discord-asg-lc"
  image_id             = "ami-0cfa29782743cdde5"
  iam_instance_profile = aws_iam_instance_profile.cas-ecs-instance-profile.name
  security_groups      = [aws_security_group.ecs-default-sg.id]
  user_data            = "#!/bin/bash\necho ECS_CLUSTER=${var.cluster-name} >> /etc/ecs/ecs.config;echo ECS_BACKEND_HOST= >> /etc/ecs/ecs.config;"
  instance_type        = "t2.nano"
  key_name             = "ssh-key-aws-override"
}

resource "aws_autoscaling_group" "cas-discord-asg" {
  name                      = "cas-discord-asg"
  vpc_zone_identifier       = data.aws_subnet_ids.vpc-subnet-ids.ids
  launch_configuration      = aws_launch_configuration.cas-discord-asg-lc.name

  desired_capacity          = 1
  min_size                  = 1
  max_size                  = 1
  health_check_grace_period = 300
  health_check_type         = "EC2"
}
