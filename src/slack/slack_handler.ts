import type Logger from 'bunyan';
import { DateTime } from 'luxon';
import * as config from 'config';
import axios from 'axios';

import type { Event } from '../objects/event';
import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const publishEventMessage = async (eventDetails: Event): Promise<void> => {
  const webhook: string = config.get('slack.webhook');
  const dateFormat = DateTime.local(eventDetails.start.local.getDate())
    .toLocaleString(DateTime.DATE_HUGE);
  log.info(`Forwarding event announcement for event of id ${eventDetails.id}`);
  const response = await axios({
    method: 'post',
    url: webhook,
    data: {
      text: `@channel - The following is an official Code and Stuff event on ${
        dateFormat} - ${eventDetails.url}`,
    },
  });
  if (!((/^2[0-9]{2}$/u).exec(response.status.toString()))) {
    log.warn(`Unable to post message to slack... :: ${response.status} :: ${
      JSON.stringify(response.data)}`);
  }
};

export {
  publishEventMessage,
};
