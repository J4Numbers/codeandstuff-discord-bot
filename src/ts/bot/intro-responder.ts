const metadata = require('../../../package.json');

import {Client, Message} from 'discord.js';
import Logger from 'bunyan';
import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const greetRegex = /^!cas\s+hello+$/gi

const handleEventCalls = async (incomingMessage: Message) => {
  if (greetRegex.test(incomingMessage.content)) {
    try {
      log.debug('Noticed new request for an introduction...');
      incomingMessage.channel.send(
        `Hello! My name is \`${metadata.name}\`. `
        + `I am \`${metadata.version}\` iterations old `
        + `and was made by \`${metadata.author}\`.`
      );
    } catch (e) {
      log.warn(`Unable to send greeting message :: ${e.message}`);
    }
  }
}

function register(discordClient: Client) {
  discordClient.on('message', handleEventCalls);
  log.debug('Registered introduction request handler');
}

export {
  register,
};
