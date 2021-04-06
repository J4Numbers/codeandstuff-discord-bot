resource "aws_ecs_cluster" "cas-discord-cluster" {
  name = var.cluster-name

  depends_on = [
    aws_autoscaling_group.cas-discord-asg
  ]
}

resource "aws_ecs_task_definition" "cas-discord-definition" {
  family = "cas-discord-definition"
  container_definitions = jsonencode([
    {
      environment: [
        {
          name: "APP_DEBUG",
          value: var.application-debug-mode
        },
        {
          name: "LOGGER_LEVEL",
          value: var.logger-level
        }
      ],
      image: "${data.aws_ecr_repository.discord-bot-registry.repository_url}:${var.deploy-version}"
      logConfiguration: {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${var.cluster-name}/logs",
          "awslogs-region": "eu-west-2",
          "awslogs-stream-prefix": "ecs"
        }
      }
      memory: 128,
      name: "cas-discord-service"
      secrets: [
        {
          name: "DISCORD_TOKEN",
          valueFrom: aws_ssm_parameter.param-discord-token.name
        },
        {
          name: "DISCORD_WELCOME_CHANNEL_ID",
          valueFrom: aws_ssm_parameter.param-discord-welcome-channel-id.name
        },
        {
          name: "DISCORD_JOINED_CHANNEL_ID",
          valueFrom: aws_ssm_parameter.param-discord-joined-channel-id.name
        },
        {
          name: "DISCORD_ATTENDEE_ROLE_ID",
          valueFrom: aws_ssm_parameter.param-discord-attendee-role-id.name
        },
        {
          name: "EVENTBRITE_TOKEN",
          valueFrom: aws_ssm_parameter.param-eventbrite-token.name
        },
        {
          name: "EVENTBRITE_ORGANISATION_ID",
          valueFrom: aws_ssm_parameter.param-eventbrite-org-id.name
        }
      ]
    }
  ])
  requires_compatibilities = ["EC2"]
  execution_role_arn = aws_iam_role.cas-ecs-executor.arn
}

resource "aws_ecs_service" "cas-discord-service" {
  name = "code-and-stuff-discord-bot-service"
  cluster = aws_ecs_cluster.cas-discord-cluster.arn
  task_definition = aws_ecs_task_definition.cas-discord-definition.family
  desired_count = 1
}
