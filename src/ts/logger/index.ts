import Logger, {LoggerOptions} from "bunyan";
import * as config from 'config';

let logger: Logger;

const resolveLogger = (): Logger => {
    let loggerOpts: LoggerOptions = {
        name: config.get('app.name'),
        level: config.get('logging.level'),
    };
    return Logger.createLogger(loggerOpts);
}

export default (): Logger => {
    if (logger === undefined) {
        logger = resolveLogger();
    }
    return logger;
}
