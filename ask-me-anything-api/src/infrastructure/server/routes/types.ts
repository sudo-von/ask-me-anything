import { components } from '@sudo-von/ask-me-anything-core';

export type DeserializedSchema<T extends keyof components['schemas']> =
  components['schemas'][T] extends { data: { attributes: infer A; id: infer I } }
  ? A & { id: I }
  : components['schemas'][T] extends { data: { attributes: infer A } }
  ? A
  : never;