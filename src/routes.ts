"use strict";
/// <reference path="../_all.d.ts" />

import { Router } from 'express';

const router: Router = Router();

import { TodosCtrl } from './todos/todosCtrl';


// /todos
router.get('/todos', TodosCtrl.List);
router.post('/todos', TodosCtrl.Create);
router.put('/todos/:id', TodosCtrl.GetById, TodosCtrl.Update);
router.delete('/todos/:id',TodosCtrl.GetById, TodosCtrl.Delete);

export const routes: Router = router;
