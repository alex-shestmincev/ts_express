"use strict";
/// <reference path="../_all.d.ts" />

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import { routes } from './routes';
import { HttpError, IError } from './libs/errors';

/**
 * The server.
 *
 * @class Server
 */
class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();
  }

  config() {
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(routes);

    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      next(new HttpError(404, "Not Found"));
    });

    // Error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      if (!err.code || err.code >= 500) {
        console.error(err);
        res.status(400);
        res.json({ error: 'Uncatched error' });
        return;
      }
      res.status(err.code);
      res.json({error: err.message});
    });
  }
}

var server = Server.bootstrap();
export = server.app;
