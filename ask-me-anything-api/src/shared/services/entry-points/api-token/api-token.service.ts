import jsonwebtoken from 'jsonwebtoken';
import { ConfigurationService } from '@services/configuration';
import { DeserializedUser } from '../api-documentation/types';
import { AbstractApiTokenService } from './api-token.abstracts';

const configurationService = new ConfigurationService();
const SECRET_KEY = configurationService.get('SECRET_KEY');

export class ApiTokenService extends AbstractApiTokenService {
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