resource "aws_ssm_parameter" "param_discord_token" {
  name      = "/discord/token"
  type      = "String"
  value     = var.discord_token
  overwrite = true
}

resource "aws_ssm_parameter" "param_discord_welcome_channel_id" {
  name      = "/discord/channel/welcome/id"
  type      = "String"
  value     = var.discord_welcome_channel_id
  overwrite = true
}

resource "aws_ssm_parameter" "param_discord_joined_channel_id" {
  name      = "/discord/channel/joined/id"
  type      = "String"
  value     = var.discord_joined_channel_id
  overwrite = true
}

resource "aws_ssm_parameter" "param_discord_voice_channel_group_id" {
  name      = "/discord/channel/group/voice/id"
  type      = "String"
  value     = var.discord_voice_channel_group_id
  overwrite = true
}

resource "aws_ssm_parameter" "param_discord_text_channel_group_id" {
  name      = "/discord/channel/group/text/id"
  type      = "String"
  value     = var.discord_text_channel_group_id
  overwrite = true
}

resource "aws_ssm_parameter" "param_discord_attendee_role_id" {
  name      = "/discord/role/attendee/id"
  type      = "String"
  value     = var.discord_attendee_role_id
  overwrite = true
}

resource "aws_ssm_parameter" "param_discord_mentor_role_id" {
  name      = "/discord/role/mentor/id"
  type      = "String"
  value     = var.discord_mentor_role_id
  overwrite = true
}

resource "aws_ssm_parameter" "param_eventbrite_token" {
  name      = "/eventbrite/token"
  type      = "String"
  value     = var.eventbrite_token
  overwrite = true
}

resource "aws_ssm_parameter" "param_eventbrite_org_id" {
  name      = "/eventbrite/organisation/id"
  type      = "String"
  value     = var.eventbrite_org_id
  overwrite = true
}
