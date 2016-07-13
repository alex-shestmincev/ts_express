"use strict";
/// <reference path="../_all.d.ts" />

import { Router } from 'express';

const router: Router = Router();

import { TodosCtrl } from './todos/todosCtrl';



router.get('/todos', TodosCtrl.List);

export const routes: Router = router;
