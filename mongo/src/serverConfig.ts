import { Config } from '@gabliam/core';
import { ExpressConfig, ExpressErrorConfig } from '@gabliam/express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { createError } from './utils';

@Config()
export class ServerConfig {
    @ExpressConfig()
    addExpressConfig(app: express.Application) {
        console.log('addExpressConfig lol');
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
        app.use(helmet());
    }

    @ExpressErrorConfig()
    addExpressErrorConfig(app: express.Application) {
        console.log('ExpressErrorConfig azeazeaze');
        app.use(function (err, req, res, next) {
          let error = createError(err);
          res.status(error.statusCode).json(error);
      });
    }
}