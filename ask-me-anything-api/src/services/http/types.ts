import { HTTP_STATUS_CODES } from "./status-codes";

export type HttpStatusCodeKey = keyof typeof HTTP_STATUS_CODES;
export type HttpStatusCode = typeof HTTP_STATUS_CODES[HttpStatusCodeKey];

export interface IHttpError {
  code: string;
  detail: string;
  statusCode: HttpStatusCode;
  title: string;
};