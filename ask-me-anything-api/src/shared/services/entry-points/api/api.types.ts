import { IService } from '@services/services.types';
import { STATUS_CODES } from './api.constants';
import { components } from '@sudo-von/ask-me-anything-core';

export type ApiError = {
  code: string;
  detail: string;
  status: StatusCodeValue;
  title: string;
};

export type DeserializedApiData<T extends keyof components['schemas']> =
  components['schemas'][T] extends {
    data: { attributes: infer A; id: infer I };
  }
  ? A & { id: I }
  : components['schemas'][T] extends { data: { attributes: infer A } }
  ? A
  : never;

export interface IApiService extends IService { };

export type StatusCodeKey = keyof typeof STATUS_CODES;
export type StatusCodeValue = (typeof STATUS_CODES)[StatusCodeKey];