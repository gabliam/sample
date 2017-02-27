import 'reflect-metadata';
import * as http from 'http';
import * as path from 'path';
import { Gabliam } from '@gabliam/core';
import restPlugin from '@gabliam/rest';
import dbPlugin from '@gabliam/typeorm';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

new Gabliam({
  discoverPath: __dirname,
  configPath: path.resolve(__dirname, '../config')
})
  .addPlugin(restPlugin)
  .addPlugin(dbPlugin)
  .addConfig(app => {
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(helmet());
  })
  .build()
  .then(App => {
    const port = normalizePort(process.env.PORT || 3000);
    App.set('port', port);

    const server = http.createServer(App);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    function normalizePort(val: number | string): number | string | boolean {
      let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
      if (isNaN(port)) return val;
      else if (port >= 0) return port;
      else return false;
    }

    function onError(error: NodeJS.ErrnoException): void {
      if (error.syscall !== 'listen') throw error;
      let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
      switch (error.code) {
        case 'EACCES':
          console.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    }

    function onListening(): void {
      let addr = server.address();
      let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
      console.log(`Listening on ${bind}`);
    }
  });
