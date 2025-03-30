import { DeserializedSchema } from "../../types";
import { CreateUser } from "./types";

export const deserializeCreateUser = (createUser: CreateUser): DeserializedSchema<'CreateUser'> => ({
  name: createUser.data.attributes.name,
  password: createUser.data.attributes.password,
  username: createUser.data.attributes.username,
});

