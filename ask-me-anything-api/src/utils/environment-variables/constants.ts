import { getEnvironmentVariables } from './configuration';

export const ENVIRONMENTS = [
  'development',
  'qa',
  'staging',
  'sandbox',
  'production',
] as const;

export const VARIABLES = getEnvironmentVariables();
