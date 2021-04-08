module.exports = {
  app: {
    name: 'codeandstuff-discord-bot',
    debug: false,
  },
  discord: {
    token: undefined,
    welcome_channel: undefined,
    joined_channel: undefined,
    voice_channel_group: undefined,
    text_channel_group: undefined,
    attendee_role: undefined,
    mentor_role: undefined,
  },
  eventbrite: {
    token: undefined,
    org_id: undefined,
  },
  logger: {
    level: 'info',
  },
};
