"use strict";
/// <reference path="../../_all.d.ts" />

import { Request, Response, NextFunction } from 'express';
import * as config from 'config';
import { TodosModel, ITodos } from './todosModel';
import * as mongoose from 'mongoose';
import { HttpError, IError } from '../libs/errors';

export class TodosCtrl {
  static async GetById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: string = req.query.id;
    const task: ITodos = await TodosModel.findById(id).exec();
    if (!task){
      const error: IError = new HttpError(404, 'Task is not found');
      return next(error);
    }

    next();
  }

  static async List(req: Request, res: Response, next: NextFunction): Promise<void> {
    const list: Array<ITodos> = await TodosModel.find({}).exec();

    res.json({ todos: list});
  }

  static async Create(req: Request, res: Response, next: NextFunction): Promise<void> {
    let newTask: ITodos = req.body.task;

    const created: ITodos = await TodosModel.create(newTask);
    res.status(201);
    res.json({ task: created });
  }

  static async Update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: string = req.query.id;
    const task: ITodos = await TodosModel.findById(id).exec();
    let upTask: ITodos = req.body.task;

    task.status = upTask.status;
    await task.save();

    res.json({ task });
  }

  static async Delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: string = req.query.id;
    const task: ITodos = await TodosModel.findById(id).exec();

    await task.remove();

    res.json({ deleted: true });
  }
}
