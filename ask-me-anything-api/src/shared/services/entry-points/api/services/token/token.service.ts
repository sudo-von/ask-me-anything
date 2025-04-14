import jsonwebtoken from 'jsonwebtoken';
import { ConfigurationService } from '@services/configuration';
import { AbstractTokenService } from './token.abstracts';
import { DeserializedUser } from './token.types';

const configurationService = ConfigurationService.getInstance();
const SECRET_KEY = configurationService.get('SECRET_KEY');

export class TokenService extends AbstractTokenService {
  static sign(deserializedUser: DeserializedUser): string {
    try {
      const token = jsonwebtoken.sign(deserializedUser, SECRET_KEY, { algorithm: 'HS256', expiresIn: 60 * 60 });
      return token;
    } catch (e) {
      const error = e as Error;
      error.message = `Failed to sign token: ${error.message}.`;
      throw error;
    }
  };
}