import { BearerToken, DeserializedSchema } from '@infrastructure/server';

export const serializeBearerToken = (bearerToken: DeserializedSchema<'BearerToken'>): BearerToken => ({
  data: {
    attributes: {
      token: bearerToken.token,
    },
    type: 'bearerToken',
  }
});