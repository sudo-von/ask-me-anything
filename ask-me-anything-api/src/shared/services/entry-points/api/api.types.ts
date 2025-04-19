import { IService } from '@services/services.types';
import { STATUS_CODES } from './api.constants';

/**
 * Represents the standardized structure of an error response in the API.
 *
 * This format is used to ensure consistency across all API error responses.
 */
export type ApiError = {
  /**
   * A machine-readable identifier for the type of error.
   */
  code: string;

  /**
   * A detailed, human-readable explanation of the error.
   */
  detail: string;

  /**
   * The HTTP status code associated with the error.
   */
  status: StatusCodeValue;

  /**
   * A short, descriptive title summarizing the error type.
   */
  title: string;
};

/**
 * Interface for API-related services.
 *
 * This interface extends from the base `IService` and can be used to define contracts for services specific to the API layer.
 *
 */
export interface IApiService extends IService { }

/**
 * A union type of all valid status code keys defined in `STATUS_CODES`.
 *
 * Each key corresponds to a semantic HTTP status.
 */
export type StatusCodeKey = keyof typeof STATUS_CODES;

/**
 * A union type of all valid HTTP status code values defined in `STATUS_CODES`.
 *
 * These are the actual numeric status codes associated with their keys.
 */
export type StatusCodeValue = (typeof STATUS_CODES)[StatusCodeKey];
