resource "aws_iam_role" "cas-ecs-executor" {
  name = "cas-ecs-executor"
  description = "A startup executor for ECS containers"

  assume_role_policy = data.aws_iam_policy_document.base-ecs-policy.json
}

resource "aws_iam_role_policy_attachment" "ecs-task-executor-default" {
  role = aws_iam_role.cas-ecs-executor.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "ssm-read-only-policy" {
  role = aws_iam_role.cas-ecs-executor.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"
}

resource "aws_iam_role" "cas-base-ec2-asg" {
  name               = "cas-base-ecs-agent"
  description        = "IAM role for ECS ASG"

  assume_role_policy = data.aws_iam_policy_document.base-ec2-policy.json
}

resource "aws_iam_role_policy_attachment" "ecs_agent" {
  role       = aws_iam_role.cas-base-ec2-asg.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "cas-ecs-instance-profile" {
  name = "cas-ecs-instance-profile"
  role = aws_iam_role.cas-base-ec2-asg.name
}
