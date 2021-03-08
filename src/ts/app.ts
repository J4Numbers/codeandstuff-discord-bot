import Logger from 'bunyan';
import * as logger_engine from './logger';
import * as discord_engine from './bot';
import {Client} from 'discord.js';
import {register as registerOnGuildMemberJoin} from './bot/join-introduction';
import {register as registerOnMessageActions} from './bot/on-message';

let logger: Logger = logger_engine.resolveLogger();
let discordBot: Client;

logger.info('Loading discord bot...');

discordBot = discord_engine.resolveDiscordBot();

registerOnGuildMemberJoin(discordBot);
registerOnMessageActions(discordBot);
