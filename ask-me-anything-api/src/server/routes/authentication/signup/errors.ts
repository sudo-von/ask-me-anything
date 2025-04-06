import { HttpError, STATUS_CODES } from '@utils/http';

export class UsernameAlreadyInUseServerError extends HttpError {
  constructor() {
    super({
      code: 'USERNAME_ALREADY_IN_USE',
      detail: 'This username is already in use. Please choose another one.',
      status: STATUS_CODES.CONFLICT,
      title: 'Username already in use.',
    });
  }
}
