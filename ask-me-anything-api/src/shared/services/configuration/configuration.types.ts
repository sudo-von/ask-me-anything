import { ENVIRONMENTS } from './configuration.constants.';

export type Configuration = {
  ENVIRONMENT: Environment;
  PORT: number;
  SALT_ROUNDS: number;
  SECRET_KEY: string;
};

export type ConfigurationKey = keyof Configuration;
export type ConfigurationValue = Configuration[ConfigurationKey];

export interface IConfigurationService {
  get: (configurationKey: ConfigurationKey) => ConfigurationValue;
};

export type Environment = (typeof ENVIRONMENTS)[number];