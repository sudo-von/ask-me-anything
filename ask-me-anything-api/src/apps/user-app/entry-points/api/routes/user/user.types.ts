import { DeserializedCoreData } from '@services/core';
import { components } from '@sudo-von/ask-me-anything-core';

export type DeserializedCreateUser = DeserializedCoreData<'CreateUser'>;

export type SerializedCreateUser = components['schemas']['CreateUser'];