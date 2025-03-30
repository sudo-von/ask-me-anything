import { createHttpError, HTTP_STATUS_CODES } from "@infrastructure/server/utils/http";

export const usernameAlreadyInUse = createHttpError({
  code: 'USERNAME_ALREADY_IN_USE',
  detail: 'This username is already in use. Please choose another one.',
  statusCode: HTTP_STATUS_CODES.CONFLICT,
  title: 'Username already in use.',
});