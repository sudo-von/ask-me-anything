import { Routes } from '@server';
import { components } from '@sudo-von/ask-me-anything-core';

export type BearerToken = components['schemas']['BearerToken'];
export type CreateUser = components['schemas']['CreateUser'];

export type DeserializedBearerToken = Routes.DeserializedSchema<'BearerToken'>;
export type DeserializedCreateUser = Routes.DeserializedSchema<'CreateUser'>;
