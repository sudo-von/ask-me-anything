import { ApiBaseError, STATUS_CODES } from "@services/entry-points/api";

export class UsernameAlreadyInUseServerError extends ApiBaseError {
  constructor() {
    super({
      code: 'USERNAME_ALREADY_IN_USE',
      detail: 'This username is already in use. Please choose another one.',
      status: STATUS_CODES.CONFLICT,
      title: 'Username already in use.',
    });
  }
}
