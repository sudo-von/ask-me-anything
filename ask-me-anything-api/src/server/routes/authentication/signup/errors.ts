import { Http } from '@utils';

const { HTTP_STATUS_CODES, HttpError } = Http;

export class HttpUsernameAlreadyInUseError extends HttpError {
  constructor() {
    super({
      code: 'USERNAME_ALREADY_IN_USE',
      detail: 'This username is already in use. Please choose another one.',
      statusCode: HTTP_STATUS_CODES.CONFLICT,
      title: 'Username already in use.',
    });
  }
}
