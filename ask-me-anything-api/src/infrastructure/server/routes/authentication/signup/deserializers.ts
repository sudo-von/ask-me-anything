import { Signup, DeserializedSchema } from '@infrastructure/server';

export const deserializeCreateUser = (createUser: Signup.CreateUser): DeserializedSchema<'CreateUser'> => ({
  name: createUser.data.attributes.name,
  password: createUser.data.attributes.password,
  username: createUser.data.attributes.username,
});

