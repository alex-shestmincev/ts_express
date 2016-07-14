"use strict";
/// <reference path="../_all.d.ts" />

import { Router } from 'express';

const router: Router = Router();

import { TodosCtrl } from './todos/todosCtrl';


// /todos
router.get('/todos', TodosCtrl.List);
router.post('/todos', TodosCtrl.Create);
router.get('/todos/:id', TodosCtrl.getByIdMdlw, TodosCtrl.GetById);
router.put('/todos/:id', TodosCtrl.getByIdMdlw, TodosCtrl.Update);
router.delete('/todos/:id',TodosCtrl.getByIdMdlw, TodosCtrl.Delete);

export const routes: Router = router;
