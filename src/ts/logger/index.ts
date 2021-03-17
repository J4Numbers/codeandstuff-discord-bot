import Logger, {LoggerOptions} from 'bunyan';
import config from 'config';

let logger: Logger;

const generateLogger = (): Logger => {
  let loggerOpts: LoggerOptions = {
    name: config.get('app.name'),
    level: config.get('logger.level'),
  };
  return Logger.createLogger(loggerOpts);
}

export default function resolveLogger(): Logger {
  if (logger === undefined) {
    logger = generateLogger();
  }
  return logger;
}
