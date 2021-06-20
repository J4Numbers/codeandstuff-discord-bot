import type Logger from 'bunyan';
import type { Client } from 'discord.js';
import config from 'config';

import resolveLogger from './logger';
import resolveDiscordBot from './bot';
import { register as registerDirectMessageActions } from './bot/private-message-handler';
import { register as registerIntroResponderActions } from './bot/intro-responder';
import { register as registerOnGuildMemberJoin } from './bot/join-introduction';
import { register as registerOnMessageActions } from './bot/on-registration-message';
import { register as registerPairingActions } from './bot/pairing-responder';
import { register as registerCleanDownActions } from './bot/cleaning-responder';
import { register as registerEventListActions } from './bot/event-promoter';
import { register as registerDebugActions } from './bot/debug-handler';

const logger: Logger = resolveLogger();

logger.info('Loading discord bot...');
const discordBot: Client = resolveDiscordBot();

registerDirectMessageActions(discordBot);
registerIntroResponderActions(discordBot);
registerOnGuildMemberJoin(discordBot);
registerOnMessageActions(discordBot);
registerPairingActions(discordBot);
registerCleanDownActions(discordBot);
registerEventListActions(discordBot);

if (config.get('app.debug')) {
  registerDebugActions(discordBot);
}
