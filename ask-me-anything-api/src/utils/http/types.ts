import { HTTP_STATUS_CODES } from './constants';

export type HttpStatusCodeKey = keyof typeof HTTP_STATUS_CODES;
export type HttpStatusCodeValue = (typeof HTTP_STATUS_CODES)[HttpStatusCodeKey];

export interface IHttpError {
  code: string;
  detail: string;
  status: HttpStatusCodeValue;
  title: string;
}
