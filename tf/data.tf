data "aws_iam_policy_document" "base-ec2-policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "base-ecs-policy" {
  statement {
    actions = [
      "sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

data "aws_ecr_repository" "discord-bot-registry" {
  name = "j4numbers/code-and-stuff-discord-bot"
}

data "aws_subnet_ids" "vpc-subnet-ids" {
  vpc_id = var.vpc-id
}
