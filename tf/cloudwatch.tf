resource "aws_cloudwatch_log_group" "ecs_cas_log_group" {
  name              = "/ecs/${var.cluster_name}/logs"
  retention_in_days = 5
}
