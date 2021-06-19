import type Logger from 'bunyan';
import { Client } from 'discord.js';
import config from 'config';

import resolveLogger from '../logger';

const logger: Logger = resolveLogger();

let discordBot: Client | undefined;

const generateDiscordBot = (): Client => {
  const discordClient = new Client();
  void discordClient.login(config.get('discord.token'));
  discordClient.on('ready', () => {
    if (discordClient.user !== null) {
      logger.info(`Logged in as ${discordClient.user.tag}!`);
    }
  });
  discordClient.on('shardError', (shardError: Error) => {
    logger.warn(`Error thrown during usage :: ${shardError.message}`);
  });
  return discordClient;
};

export default function resolveDiscordBot (): Client {
  if (discordBot === undefined) {
    discordBot = generateDiscordBot();
  }
  return discordBot;
}
