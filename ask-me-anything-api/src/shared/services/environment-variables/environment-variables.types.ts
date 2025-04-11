import { ENVIRONMENTS } from './environment-variables.constants.';

export type Environment = (typeof ENVIRONMENTS)[number];

export type EnvironmentVariables = {
  ENVIRONMENT: Environment;
  PORT: number;
  SALT_ROUNDS: number;
  SECRET_KEY: string;
};

export interface IEnvironmentVariablesService {
  getEnvironmentVariable: (name: string) => string;
  getEnvironmentVariableAsEnvironment: (name: string) => Environment;
  getEnvironmentVariableAsNumber: (name: string) => number;
  getEnvironmentVariables: (name: string) => EnvironmentVariables;
};