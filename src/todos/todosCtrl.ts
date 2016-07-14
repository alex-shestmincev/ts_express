"use strict";
/// <reference path="../../_all.d.ts" />

import { Request, Response, NextFunction } from 'express';
import * as config from 'config';
import { TodosModel, ITodos } from './todosModel';
import * as mongoose from 'mongoose';
import { HttpError, IError } from '../libs/errors';

export class TodosCtrl {
  static async getByIdMdlw(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const todo: ITodos = await TodosModel.findById(id).exec();
      if (!todo){
        const error: IError = new HttpError(404, 'Todo is not found');
        return next(error);
      }

      next();
    } catch(err) {
      next(err);
    }
  }

  static async List(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const list: Array<ITodos> = await TodosModel.find({}).exec();

      res.json({ todos: list});
    } catch (err) {
      next(err);
    }
  }

  static async Create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let newTask: ITodos = req.body.todo;
      const created: ITodos = await TodosModel.create(newTask);

      res.status(201);
      res.json({ todo: created });
    } catch (err) {
      next(err);
    }
  }

  static async GetById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const todo: ITodos = await TodosModel.findById(id).exec();

      res.json({ todo });
    } catch (err) {
      next(err);
    }
  }

  static async Update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const todo: ITodos = await TodosModel.findById(id).exec();
      let upTask: ITodos = req.body.todo;

      todo.status = upTask.status;
      todo.title = upTask.title;
      todo.description = upTask.description;
      await todo.save();

      res.json({ todo });
    } catch (err) {
      next(err);
    }
  }

  static async Delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.query.id;
      const task: ITodos = await TodosModel.findById(id).exec();

      await task.remove();

      res.json({ deleted: true });
    } catch (err) {
      next(err);
    }
  }
}
