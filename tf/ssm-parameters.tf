resource "aws_ssm_parameter" "param-discord-token" {
  name      = "/discord/token"
  type      = "String"
  value     = var.discord-token
  overwrite = true
}

resource "aws_ssm_parameter" "param-discord-welcome-channel-id" {
  name      = "/discord/channel/welcome/id"
  type      = "String"
  value     = var.discord-welcome-channel-id
  overwrite = true
}

resource "aws_ssm_parameter" "param-discord-joined-channel-id" {
  name      = "/discord/channel/joined/id"
  type      = "String"
  value     = var.discord-joined-channel-id
  overwrite = true
}

resource "aws_ssm_parameter" "param-discord-voice-channel-group-id" {
  name      = "/discord/channel/group/voice/id"
  type      = "String"
  value     = var.discord-voice-channel-group-id
  overwrite = true
}

resource "aws_ssm_parameter" "param-discord-text-channel-group-id" {
  name      = "/discord/channel/group/text/id"
  type      = "String"
  value     = var.discord-text-channel-group-id
  overwrite = true
}

resource "aws_ssm_parameter" "param-discord-attendee-role-id" {
  name      = "/discord/role/attendee/id"
  type      = "String"
  value     = var.discord-attendee-role-id
  overwrite = true
}

resource "aws_ssm_parameter" "param-discord-mentor-role-id" {
  name      = "/discord/role/mentor/id"
  type      = "String"
  value     = var.discord-mentor-role-id
  overwrite = true
}

resource "aws_ssm_parameter" "param-eventbrite-token" {
  name      = "/eventbrite/token"
  type      = "String"
  value     = var.eventbrite-token
  overwrite = true
}

resource "aws_ssm_parameter" "param-eventbrite-org-id" {
  name      = "/eventbrite/organisation/id"
  type      = "String"
  value     = var.eventbrite-org-id
  overwrite = true
}
