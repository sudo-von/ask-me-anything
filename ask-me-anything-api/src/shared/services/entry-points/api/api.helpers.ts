import { STATUS_CODES } from './api.constants';
import { StatusCodeKey } from './api.types';

/**
 * Type guard that checks whether a given string is a valid status code key.
 *
 * Useful to ensure type safety when working with dynamic values that may or may not
 * match the keys of the predefined status code enumeration.
 *
 * @param statusCodeKey - The string to validate as a status code key.
 *
 * @returns `true` if the key exists, otherwise `false`.
 */
export const isValidStatusCodeKey = (
  statusCodeKey: string,
): statusCodeKey is StatusCodeKey => statusCodeKey in STATUS_CODES;
