import { Http } from '@utils';

const { HttpError, HTTP_STATUS_CODES } = Http;

export class InternalServerError extends HttpError {
  constructor() {
    super({
      code: 'INTERNAL_SERVER_ERROR',
      detail:
        'An unexpected error occurred on the server. Please try again later.',
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      title: 'Internal Server Error.',
    });
  }
}

export class ValidationError extends HttpError {
  constructor(error: Partial<Http.IHttpError>) {
    super({
      code: error.code || 'VALIDATION_ERROR',
      detail:
        error.detail ||
        'The request could not be processed due to invalid input. Please check the provided data.',
      status: error.status || HTTP_STATUS_CODES.BAD_REQUEST,
      title: error.title || 'There was an error while validating the request.',
    });
  }
}
