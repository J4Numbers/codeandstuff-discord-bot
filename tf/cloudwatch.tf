resource "aws_cloudwatch_log_group" "ecs-cas-log-group" {
  name              = "/ecs/${var.cluster-name}/logs"
  retention_in_days = 5
}
