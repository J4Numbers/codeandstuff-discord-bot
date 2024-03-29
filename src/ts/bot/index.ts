import config from 'config';
import {Client} from 'discord.js';
import Logger from 'bunyan';
import resolveLogger from '../logger';

const logger: Logger = resolveLogger();

let discordBot: Client;

const generateDiscordBot = (): Client => {
  let discordClient = new Client();
  discordClient.login(config.get('discord.token'));
  discordClient.on('ready', () => {
    if (discordClient.user !== null) {
      logger.info(`Logged in as ${discordClient.user.tag}!`);
    }
  });
  discordClient.on('shardError', (shardError: Error) => {
    logger.warn(`Error thrown during usage :: ${shardError.message}`);
  })
  return discordClient;
}

export default function resolveDiscordBot(): Client {
  if (discordBot === undefined) {
    discordBot = generateDiscordBot();
  }
  return discordBot;
}
