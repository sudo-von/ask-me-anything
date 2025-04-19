import { DeserializedUser } from './token.types';

/**
 * Abstract base class for services that handle token creation and manipulation.
 *
 * Defines the contract for how a token should be generated from a deserialized user object
 * Implementations should provide the logic to sign or encode a user into a secure token.
 */
export abstract class AbstractTokenService {
  /**
   * Generates a signed token from the provided deserialized user.
   *
   * @param deserializedUser - The user object containing relevant identity data to embed in the token.
   *
   * @returns A signed token string representing the authenticated user.
   */
  static sign: (deserializedUser: DeserializedUser) => string;
}
