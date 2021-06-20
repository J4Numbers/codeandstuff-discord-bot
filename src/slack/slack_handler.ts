import { DateTime } from 'luxon';
import * as config from 'config';
import axios from 'axios';

import type { Event } from '../objects/event';

const publishEventMessage = async (eventDetails: Event): Promise<void> => {
  const webhook: string = config.get('slack.webhook');
  const dateFormat = DateTime.local(eventDetails.start.local).toLocaleString(DateTime.DATE_HUGE);
  const response = await axios({
    method: 'post',
    url: webhook,
    data: {
      text: `@channel - The following is an official Code and Stuff event on ${dateFormat} - ${eventDetails.url}`,
    },
  });
};

export {
  publishEventMessage,
};
