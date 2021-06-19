import type { LoggerOptions } from 'bunyan';
import Logger from 'bunyan';
import config from 'config';

let logger: Logger | undefined;

const generateLogger = (): Logger => {
  const loggerOpts: LoggerOptions = {
    name: config.get('app.name'),
    level: config.get('logger.level'),
  };
  return Logger.createLogger(loggerOpts);
};

export default function resolveLogger (): Logger {
  if (logger === undefined) {
    logger = generateLogger();
  }
  return logger;
}
