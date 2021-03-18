import Logger from 'bunyan';
import resolveLogger from './logger';
import resolveDiscordBot from './bot';
import {Client} from 'discord.js';
import {register as registerOnGuildMemberJoin} from './bot/join-introduction';
import {register as registerOnMessageActions} from './bot/on-registration-message';
import {register as registerDebugActions} from './bot/debug-handler';
import config from 'config';

let logger: Logger = resolveLogger();
let discordBot: Client;

logger.info('Loading discord bot...');

discordBot = resolveDiscordBot();

registerOnGuildMemberJoin(discordBot);
registerOnMessageActions(discordBot);

if (config.get('app.debug')) {
  registerDebugActions(discordBot);
}
