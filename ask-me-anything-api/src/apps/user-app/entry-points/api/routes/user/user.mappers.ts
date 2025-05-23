import { DeserializedCreateUser, SerializedCreateUser } from './user.types';

export const deserializeCreateUser = (
  serializedCreateUser: SerializedCreateUser,
): DeserializedCreateUser => ({
  name: serializedCreateUser.data.attributes.name,
  password: serializedCreateUser.data.attributes.password,
  username: serializedCreateUser.data.attributes.username,
});
