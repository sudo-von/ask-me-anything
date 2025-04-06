import { DeserializedSchema } from '@server/routes';
import { components } from '@sudo-von/ask-me-anything-core';

export type DeserializedBearerToken = DeserializedSchema<'BearerToken'>;
export type DeserializedCreateUser = DeserializedSchema<'CreateUser'>;

export type SerializedBearerToken = components['schemas']['BearerToken'];
export type SerializedCreateUser = components['schemas']['CreateUser'];