import { DeserializedApiData } from '@services/entry-points/api';
import { components } from '@sudo-von/ask-me-anything-core';

export type DeserializedBearerToken = DeserializedApiData<'BearerToken'>;
export type DeserializedCreateUser = DeserializedApiData<'CreateUser'>;

export type SerializedBearerToken = components['schemas']['BearerToken'];
export type SerializedCreateUser = components['schemas']['CreateUser'];