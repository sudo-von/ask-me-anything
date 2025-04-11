import { STATUS_CODES } from './api.constants';

export type ApiError = {
  code: string;
  detail: string;
  status: StatusCodeValue;
  title: string;
};

export interface IApiService {
  init: () => Promise<void>;
  close: () => Promise<void>;
};

export type StatusCodeKey = keyof typeof STATUS_CODES;
export type StatusCodeValue = (typeof STATUS_CODES)[StatusCodeKey];