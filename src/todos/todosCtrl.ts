"use strict";
/// <reference path="../../_all.d.ts" />

import { Request, Response, NextFunction } from 'express';

export class TodosCtrl {
  static List(req: Request, res: Response, next: NextFunction): void {
    res.json({ url: 'todos list'});
  }
}
