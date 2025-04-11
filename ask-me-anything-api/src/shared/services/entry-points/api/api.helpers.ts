import { STATUS_CODES } from './api.constants';
import { StatusCodeKey } from './api.types';

export const isValidStatusCodeKey = (
  statusCodeKey: string,
): statusCodeKey is StatusCodeKey =>
  statusCodeKey in STATUS_CODES;
