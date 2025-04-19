import { components } from '@sudo-von/ask-me-anything-core';

/**
 * Extracts and flattens the data structure from the core schema into a simplified object.
 *
 * This utility type takes a schema key from the core schema and returns
 * a flattened version of its `data.attributes` object, optionally including an `id`
 * if it exists in the original schema.
 *
 * @template T - The key of the schema inside `components['schemas']`.
 */
export type DeserializedCoreData<T extends keyof components['schemas']> =
  components['schemas'][T] extends {
    data: { attributes: infer A; id: infer I };
  }
    ? A & { id: I }
    : components['schemas'][T] extends { data: { attributes: infer A } }
      ? A
      : never;