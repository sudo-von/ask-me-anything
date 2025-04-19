import { AppsBaseError } from '@apps/apps.error';

/**
 * Thrown when an error occurs during the token signing process.
 *
 * This error typically wraps a lower-level error thrown by the token library
 * and provides a more descriptive message indicating that the signing process has failed.
 */
export class TokenSigningError extends AppsBaseError {
  constructor(message: string) {
    super(`Failed to sign token: ${message}.`);
  }
}