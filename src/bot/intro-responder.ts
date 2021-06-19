import type { Client, Message } from 'discord.js';
import type Logger from 'bunyan';
import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const greetRegex = /^!cas\s+hello+$/gui;

const handleEventCalls = async (incomingMessage: Message): Promise<void> => {
  if (greetRegex.test(incomingMessage.content)) {
    try {
      log.debug('Noticed new request for an introduction...');
      void await incomingMessage.channel.send(
        `Hello! My name is \`${process.env.npm_package_name ?? 'a mystery'}\`. `
        + `I am \`${process.env.npm_package_version ?? 'several'}\` iterations old `
        + `and was made by \`${process.env.npm_package_author ?? 'an unknown author'}\`.`,
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        log.warn(`Unable to send greeting message :: ${e.message}`);
      }
    }
  }
};

const register = (discordClient: Client): void => {
  discordClient.on('message', handleEventCalls as (msg: Message) => void);
  log.debug('Registered introduction request handler');
};

export {
  register,
};
