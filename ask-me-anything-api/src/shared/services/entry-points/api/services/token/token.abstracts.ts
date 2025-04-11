import { DeserializedUser } from "../openapi/types";

export abstract class AbstractTokenService {
  static sign: (deserializedUser: DeserializedUser) => string;
};