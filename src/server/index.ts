import type { SecureServerOptions } from 'http2';
import type { Server } from 'restify';
import fs from 'fs';
import { createServer, plugins } from 'restify';
import * as config from 'config';

import loggingEngine from '../logger';

const log = loggingEngine();

let http2Config: SecureServerOptions | undefined;
if (config.get('app.server.http2.enabled')) {
  http2Config = {
    key: fs.readFileSync(config.get('app.server.http2.key')),
    cert: fs.readFileSync(config.get('app.server.http2.cert')),
    allowHTTP1: true,
  };
}

const serverSingleton = createServer({
  name: config.get('app.name'),
  ignoreTrailingSlash: true,
  log,
  http2: http2Config,
});
serverSingleton.pre(plugins.pre.dedupeSlashes());
serverSingleton.pre(plugins.pre.sanitizePath());

serverSingleton.use(plugins.acceptParser(serverSingleton.acceptable));
serverSingleton.use(plugins.queryParser());
serverSingleton.use(plugins.bodyParser());
serverSingleton.use(plugins.requestLogger());

export default function loadServer (serverLoaders: Array<(s: Server) => Server>): Server {
  serverLoaders.forEach((loader) => {
    loader(serverSingleton);
  });
  serverSingleton.listen(config.get('app.server.port'), () => {
    log.info(`${serverSingleton.name} has been loaded on ${serverSingleton.url}`);
  });
  return serverSingleton;
}
