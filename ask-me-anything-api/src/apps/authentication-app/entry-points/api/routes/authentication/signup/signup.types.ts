import { DeserializedCoreData } from '@services/core';
import { components } from '@sudo-von/ask-me-anything-core';

export type DeserializedBearerToken = DeserializedCoreData<'BearerToken'>;

export type SerializedBearerToken = components['schemas']['BearerToken'];