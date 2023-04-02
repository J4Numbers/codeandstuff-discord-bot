resource "aws_launch_configuration" "cas_discord_asg_lc" {
  name                 = "cas-discord-asg-lc"
  image_id             = jsondecode(data.aws_ssm_parameter.ecs_current_image.value)["image_id"]
  iam_instance_profile = aws_iam_instance_profile.cas_ecs_instance_profile.name
  security_groups      = [aws_security_group.ecs_default_sg.id]
  user_data            = "#!/bin/bash\necho ECS_CLUSTER=${var.cluster_name} >> /etc/ecs/ecs.config;echo ECS_BACKEND_HOST= >> /etc/ecs/ecs.config;"
  instance_type        = "t2.nano"
  key_name             = "ssh-key-aws-override"
}

resource "aws_autoscaling_group" "cas_discord_asg" {
  name                 = "cas-discord-asg"
  vpc_zone_identifier  = data.aws_subnet_ids.vpc_subnet_ids.ids
  launch_configuration = aws_launch_configuration.cas_discord_asg_lc.name

  desired_capacity          = 1
  min_size                  = 1
  max_size                  = 1
  health_check_grace_period = 300
  health_check_type         = "EC2"
}
