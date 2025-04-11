import {
  DeserializedBearerToken,
  DeserializedCreateUser,
  SerializedBearerToken,
  SerializedCreateUser,
} from './signup.types';

export const deserializeCreateUser = (
  serializedCreateUser: SerializedCreateUser,
): DeserializedCreateUser => ({
  name: serializedCreateUser.data.attributes.name,
  password: serializedCreateUser.data.attributes.password,
  username: serializedCreateUser.data.attributes.username,
});

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
