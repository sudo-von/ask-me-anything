import { STATUS_CODES } from './api.constants';
import { ApiError, StatusCodeValue } from './api.types';

/**
 * Base class for API-related errors conforming to the ApiError interface.
 *
 * It serves as the foundation for more specific HTTP error classes.
 */
export class ApiBaseError extends Error implements ApiError {
  code: string;
  detail: string;
  status: StatusCodeValue;
  title: string;

  constructor(error: ApiError) {
    super(error.detail);

    this.code = error.code;
    this.detail = error.detail;
    this.name = this.constructor.name;
    this.status = error.status;
    this.title = error.title;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Represents a 400 Bad Request error.
 *
 * This error should be thrown when the server cannot process the request due to
 * client-side issues such as validation errors or malformed input.
 */
export class BadRequestError extends ApiBaseError {
  constructor(error: Partial<ApiError>) {
    super({
      code: error.code || 'BAD_REQUEST_ERROR',
      detail:
        error.detail ||
        'The request could not be processed due to invalid input. Please check the provided data.',
      status: error.status || STATUS_CODES.BAD_REQUEST,
      title: error.title || 'There was an error while validating the request.',
    });
  }
}

/**
 * Represents a 500 Internal Server Error.
 *
 * This error should be thrown when an unexpected failure occurs on the server
 * that is not directly caused by the client's request.
 */
export class InternalServerError extends ApiBaseError {
  constructor() {
    super({
      code: 'INTERNAL_SERVER_ERROR',
      detail:
        'An unexpected error occurred on the server. Please try again later.',
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      title: 'Internal Server Error.',
    });
  }
}
