'use strict';

const inherits = require('util').inherits;

export interface IError extends Error {
  name: string,
  code: number,
  message: string,
  extra: any,
}

export class HttpError extends Error implements IError {
  name: string;
  code: number;
  message: string;
  extra: any;

  constructor(code: number, message: string, extra?: any) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code;
    this.message = message;
    this.extra = extra;
  }
}
