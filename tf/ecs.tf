resource "aws_ecs_cluster" "cas_discord_cluster" {
  name = var.cluster_name

  depends_on = [
    aws_autoscaling_group.cas_discord_asg
  ]
}

resource "aws_ecs_task_definition" "cas_discord_definition" {
  family = "cas-discord-definition"

  container_definitions = jsonencode([
    {
      environment: [
        {
          name: "APP_DEBUG",
          value: var.application_debug_mode
        },
        {
          name: "LOGGER_LEVEL",
          value: var.logger_level
        }
      ],
      image: "${data.aws_ecr_repository.discord_bot_registry.repository_url}:${var.deploy_version}"
      logConfiguration: {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${var.cluster_name}/logs",
          "awslogs-region": "eu-west-2",
          "awslogs-stream-prefix": "ecs"
        }
      }
      memory: 128,
      name: "cas-discord-service"
      secrets: [
        {
          name: "DISCORD_TOKEN",
          valueFrom: aws_ssm_parameter.param_discord_token.name
        },
        {
          name: "DISCORD_WELCOME_CHANNEL_ID",
          valueFrom: aws_ssm_parameter.param_discord_welcome_channel_id.name
        },
        {
          name: "DISCORD_JOINED_CHANNEL_ID",
          valueFrom: aws_ssm_parameter.param_discord_joined_channel_id.name
        },
        {
          name: "DISCORD_VOICE_CHANNEL_GROUP_ID",
          valueFrom: aws_ssm_parameter.param_discord_voice_channel_group_id.name
        },
        {
          name: "DISCORD_TEXT_CHANNEL_GROUP_ID",
          valueFrom: aws_ssm_parameter.param_discord_text_channel_group_id.name
        },
        {
          name: "DISCORD_ATTENDEE_ROLE_ID",
          valueFrom: aws_ssm_parameter.param_discord_attendee_role_id.name
        },
        {
          name: "DISCORD_MENTOR_ROLE_ID",
          valueFrom: aws_ssm_parameter.param_discord_mentor_role_id.name
        },
        {
          name: "EVENTBRITE_TOKEN",
          valueFrom: aws_ssm_parameter.param_eventbrite_token.name
        },
        {
          name: "EVENTBRITE_ORGANISATION_ID",
          valueFrom: aws_ssm_parameter.param_eventbrite_org_id.name
        }
      ]
    }
  ])

  requires_compatibilities = ["EC2"]
  execution_role_arn       = aws_iam_role.cas_ecs_executor.arn
}

resource "aws_ecs_service" "cas-discord-service" {
  name                 = "code-and-stuff-discord-bot-service"
  cluster              = aws_ecs_cluster.cas_discord_cluster.arn
  task_definition      = aws_ecs_task_definition.cas_discord_definition.family
  force_new_deployment = true
  desired_count        = 1
}
