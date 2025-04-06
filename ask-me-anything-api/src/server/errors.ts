import { HttpError, IHttpError, STATUS_CODES } from '@utils/http';

export class InternalServerError extends HttpError {
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

export class ValidationError extends HttpError {
  constructor(error: Partial<IHttpError>) {
    super({
      code: error.code || 'VALIDATION_ERROR',
      detail:
        error.detail ||
        'The request could not be processed due to invalid input. Please check the provided data.',
      status: error.status || STATUS_CODES.BAD_REQUEST,
      title: error.title || 'There was an error while validating the request.',
    });
  }
}
