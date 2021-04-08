resource "aws_iam_role" "cas_ecs_executor" {
  name        = "cas-ecs-executor"
  description = "A startup executor for ECS containers"

  assume_role_policy = data.aws_iam_policy_document.base_ecs_policy.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_executor_default" {
  role       = aws_iam_role.cas_ecs_executor.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "ssm_read_only_policy" {
  role       = aws_iam_role.cas_ecs_executor.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"
}

resource "aws_iam_role" "cas_base_ec2_asg" {
  name        = "cas-base-ecs-agent"
  description = "IAM role for ECS ASG"

  assume_role_policy = data.aws_iam_policy_document.base_ec2_policy.json
}

resource "aws_iam_role_policy_attachment" "ecs_agent" {
  role       = aws_iam_role.cas_base_ec2_asg.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "cas_ecs_instance_profile" {
  name = "cas-ecs-instance-profile"
  role = aws_iam_role.cas_base_ec2_asg.name
}
