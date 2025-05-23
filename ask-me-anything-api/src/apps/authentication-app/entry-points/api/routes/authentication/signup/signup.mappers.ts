import { DeserializedBearerToken, SerializedBearerToken } from './signup.types';

export const serializeBearerToken = (
  deserializedBearerToken: DeserializedBearerToken,
): SerializedBearerToken => ({
  data: {
    attributes: {
      token: deserializedBearerToken.token,
    },
    type: 'bearerToken',
  },
});
