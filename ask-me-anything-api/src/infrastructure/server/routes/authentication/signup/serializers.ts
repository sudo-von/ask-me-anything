import { Signup, DeserializedSchema } from '@infrastructure/server';

export const serializeBearerToken = (bearerToken: DeserializedSchema<'BearerToken'>): Signup.BearerToken => ({
  data: {
    attributes: {
      token: bearerToken.token,
    },
    type: 'bearerToken',
  }
});