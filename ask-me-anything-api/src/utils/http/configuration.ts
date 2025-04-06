import { STATUS_CODES } from './constants';
import { StatusCodeKey } from './types';

export const isValidHttpStatusCodeKey = (
  statusCodeKey: string,
): statusCodeKey is StatusCodeKey =>
  statusCodeKey in STATUS_CODES;
