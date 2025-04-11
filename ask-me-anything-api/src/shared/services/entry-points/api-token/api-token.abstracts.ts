import { DeserializedUser } from "../api-documentation/types";

export abstract class AbstractApiTokenService {
  static sign: (deserializedUser: DeserializedUser) => string;
};