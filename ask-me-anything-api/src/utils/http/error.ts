import { HttpStatusCodeValue, IHttpError } from './types';

export class HttpError extends Error implements IHttpError {
  code: string;
  detail: string;
  status: HttpStatusCodeValue;
  title: string;

  constructor(error: IHttpError) {
    super(error.detail);
    this.code = error.code;
    this.detail = error.detail;
    this.name = this.constructor.name;
    this.status = error.status;
    this.title = error.title;
  }
}
