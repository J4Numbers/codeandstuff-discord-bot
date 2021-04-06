variable "vpc-id" {
  description = "ID of the VPC to deploy to"
}

variable "deploy-version" {
  description = "The version of the service to deploy"
  default = "latest"
}

variable "cluster-name" {
  description = "Name of the ECS cluster"
  default = "cas-discord-cluster"
}

variable "application-debug-mode" {
  description = "Choose whether the application is running in debug mode"
  default = "false"
}

variable "discord-token" {
  description = "Token for accessing the Discord API"
}

variable "discord-welcome-channel-id" {
  description = "Channel ID for the post-registration Discord channel"
}

variable "discord-joined-channel-id" {
  description = "Channel ID for the newly-joined Discord channel"
}

variable "discord-attendee-role-id" {
  description = "Role ID for general attendees"
}

variable "eventbrite-token" {
  description = "Token for accessing the Eventbrite API"
}

variable "eventbrite-org-id" {
  description = "Eventbrite owning organisation ID"
}

variable "logger-level" {
  description = "Logging level to be used on outputting logs"
  default = "info"
}
