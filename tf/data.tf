data "aws_iam_policy_document" "base_ec2_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "base_ecs_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

data "aws_ecr_repository" "discord_bot_registry" {
  name = var.ecr_repo_name
}

data "aws_subnet_ids" "vpc_subnet_ids" {
  vpc_id = var.vpc_id
}
