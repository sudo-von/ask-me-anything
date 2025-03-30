import { DeserializedSchema } from '../../types';
import { BearerToken } from './types';

export const serializeBearerToken = (bearerToken: DeserializedSchema<'BearerToken'>): BearerToken => ({
  data: {
    attributes: {
      token: bearerToken.token,
    },
    type: 'bearerToken',
  }
});