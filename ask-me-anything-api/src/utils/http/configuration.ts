import { HTTP_STATUS_CODES } from './constants';
import { HttpStatusCodeKey } from './types';

export const isValidHttpStatusCodeKey = (
  httpStatusCodeKey: string,
): httpStatusCodeKey is HttpStatusCodeKey =>
  httpStatusCodeKey in HTTP_STATUS_CODES;
