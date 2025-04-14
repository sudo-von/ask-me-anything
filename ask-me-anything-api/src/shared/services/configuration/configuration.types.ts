import { ENVIRONMENTS } from './configuration.constant';

/**
 * Represents the full shape of the application's configuration.
 */
export type Configuration = {
  /** The current application environment. */
  ENVIRONMENT: Environment;

  /** The port on which the application should run. */
  PORT: number;

  /** The number of salt rounds used for hashing operations. */
  SALT_ROUNDS: number;

  /** The secret key used for signing sensitive data. */
  SECRET_KEY: string;
};

/**
 * Represents a valid key from the Configuration object.
 */
export type ConfigurationKey = keyof Configuration;

/**
 * Represents the list of allowed environments.
 */
export type Environment = (typeof ENVIRONMENTS)[number];

/**
 * This interface defines the contract that any configuration service implementation 
 * must adhere to in order to retrieve validated and strongly-typed configuration values 
 * from the application.
 */
export interface IConfigurationService {
  /**
   * Retrieves a validated and strongly typed configuration value by key.
   * 
   * @returns The parsed and validated value of the requested configuration.
   */
  get<K extends ConfigurationKey>(_configurationKey: K): Configuration[K];
}