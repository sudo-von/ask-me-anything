import { ENVIRONMENTS } from './configuration.constants.';

export type Configuration = {
  ENVIRONMENT: Environment;
  PORT: number;
  SALT_ROUNDS: number;
  SECRET_KEY: string;
};

export type ConfigurationKey = keyof Configuration;

export interface IConfigurationService {
  get: <K extends ConfigurationKey>(configurationKey: K) => Configuration[K];
};

export type Environment = (typeof ENVIRONMENTS)[number];