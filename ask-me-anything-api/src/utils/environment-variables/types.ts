import { ENVIRONMENTS } from './constants';

export type Environment = (typeof ENVIRONMENTS)[number];

export type EnvironmentVariables = {
  ENVIRONMENT: Environment;
  PORT: number;
  SALT_ROUNDS: number;
};
