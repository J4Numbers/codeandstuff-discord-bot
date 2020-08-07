import Logger, {LoggerOptions} from "bunyan";
import * as config from 'config';

let logger: Logger;

const generateLogger = (): Logger => {
    let loggerOpts: LoggerOptions = {
        name: config.get('app.name'),
        level: config.get('logging.level'),
    };
    return Logger.createLogger(loggerOpts);
}

export function resolveLogger(): Logger {
    if (logger === undefined) {
        logger = generateLogger();
    }
    return logger;
}