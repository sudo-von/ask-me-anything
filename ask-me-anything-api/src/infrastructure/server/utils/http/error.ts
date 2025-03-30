import { HttpStatusCode, IHttpError } from "@infrastructure/server";

export class HttpError extends Error implements IHttpError {
  code: string;
  detail: string;
  statusCode: HttpStatusCode;
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