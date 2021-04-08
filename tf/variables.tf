variable "vpc_id" {
  description = "ID of the VPC to deploy to"
}

variable "deploy_version" {
  description = "The version of the service to deploy"
  default     = "latest"
}

variable "cluster_name" {
  description = "Name of the ECS cluster"
  default     = "cas-discord-cluster"
}

variable "application_debug_mode" {
  description = "Choose whether the application is running in debug mode"
  default     = "false"
}

variable "discord_token" {
  description = "Token for accessing the Discord API"
}

variable "discord_welcome_channel_id" {
  description = "Channel ID for the post-registration Discord channel"
}

variable "discord_joined_channel_id" {
  description = "Channel ID for the newly-joined Discord channel"
}

variable "discord_voice_channel_group_id" {
  description = "Group id for session voice channels"
}

variable "discord_text_channel_group_id" {
  description = "Group id for session text channels"
}

variable "discord_attendee_role_id" {
  description = "Role ID for general attendees"
}

variable "discord_mentor_role_id" {
  description = "Role ID for mentors"
}

variable "eventbrite_token" {
  description = "Token for accessing the Eventbrite API"
}

variable "eventbrite_org_id" {
  description = "Eventbrite owning organisation ID"
}

variable "logger_level" {
  description = "Logging level to be used on outputting logs"
  default     = "info"
}
