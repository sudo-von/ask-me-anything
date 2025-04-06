import { STATUS_CODES } from './constants';

export type StatusCodeKey = keyof typeof STATUS_CODES;
export type StatusCodeValue = (typeof STATUS_CODES)[StatusCodeKey];

export interface IHttpError {
  code: string;
  detail: string;
  status: StatusCodeValue;
  title: string;
}
