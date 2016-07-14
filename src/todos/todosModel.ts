"use strict";
/// <reference path="../../_all.d.ts" />

import * as mongoose from 'mongoose';
import { chechStatus, STATUSES } from './helpers';

const todosSchema: mongoose.Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: STATUSES.active,
    validate: [
      {
        validator: chechStatus,
        msg: 'Invalid status'
      }
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export interface ITodos extends mongoose.Document {
  _id: mongoose.Types.ObjectId,
  title: string;
  description: string;
  status: string;
  createdAt: Date;
}

export const TodosModel = mongoose.model<ITodos>('Todos', todosSchema);
