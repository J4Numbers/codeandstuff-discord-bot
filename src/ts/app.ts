import Logger from 'bunyan';
import resolveLogger from './logger';
import resolveDiscordBot from './bot';
import {Client} from 'discord.js';
import {register as registerDirectMessageActions} from './bot/private-message-handler';
import {register as registerIntroResponderActions} from './bot/intro-responder';
import {register as registerOnGuildMemberJoin} from './bot/join-introduction';
import {register as registerOnMessageActions} from './bot/on-registration-message';
import {register as registerEventListActions} from './bot/event-promoter';
import {register as registerDebugActions} from './bot/debug-handler';
import config from 'config';

let logger: Logger = resolveLogger();
let discordBot: Client;

logger.info('Loading discord bot...');

discordBot = resolveDiscordBot();

registerDirectMessageActions(discordBot);
registerIntroResponderActions(discordBot);
registerOnGuildMemberJoin(discordBot);
registerOnMessageActions(discordBot);
registerEventListActions(discordBot);

if (config.get('app.debug')) {
  registerDebugActions(discordBot);
}
