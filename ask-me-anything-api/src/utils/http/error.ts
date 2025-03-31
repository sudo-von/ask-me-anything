import { HttpStatusCodeValue, IHttpError } from './types';

export class HttpError extends Error implements IHttpError {
  code: string;
  detail: string;
  statusCode: HttpStatusCodeValue;
  title: string;

  constructor(error: IHttpError) {
    super(error.detail);
    this.code = error.code;
    this.detail = error.detail;
    this.name = this.constructor.name;
    this.statusCode = error.statusCode;
    this.title = error.title;
  };
};