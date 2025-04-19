import { DeserializedCoreData } from '@services/core';

/**
 * Represents a flattened and strongly typed user object extracted from the core.
 */
export type DeserializedUser = DeserializedCoreData<'User'>;