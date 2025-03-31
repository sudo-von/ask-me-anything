import {
  BearerToken,
  CreateUser,
  DeserializedBearerToken,
  DeserializedCreateUser,
} from "./types";

export const deserializeCreateUser = (
  createUser: CreateUser
): DeserializedCreateUser => ({
  name: createUser.data.attributes.name,
  password: createUser.data.attributes.password,
  username: createUser.data.attributes.username,
});

export const serializeBearerToken = (
  deserializedBearerToken: DeserializedBearerToken
): BearerToken => ({
  data: {
    attributes: {
      token: deserializedBearerToken.token,
    },
    type: "bearerToken",
  },
});
