import { MethodNotImplementedYetError } from "@apps/apps.error";
import { Configuration, ConfigurationKey, Environment } from "./configuration.types";

/**
 * Acts as a static facade for accessing application configuration values.
 *
 * This abstract class is designed to be extended by a configuration service
 * that caches environment variables internally, rather than re-reading or re-processing them
 * every time a value is requested.
 *
 * Since the `get` method is static, this serves effectively as a singleton accessor,
 * providing centralized and efficient access to configuration values throughout the application.
 *
 */
export abstract class AbstractConfiguration {
  /**
   * Prevents direct instantiation of the abstract class.
   */
  protected constructor() { };

  /**
   * Retrieves a validated and strongly typed configuration value by key.
   * 
   * @returns The parsed and validated value of the requested configuration.
   */
  public get<K extends ConfigurationKey>(_configurationKey: K): Configuration[K] {
    throw new MethodNotImplementedYetError('get');
  };

  /**
   * Retrieves a raw configuration value as a string.
   * Throws an error if the configuration key is missing.
   *
   * This method must be implemented in the concrete configuration service.
   *
   * @returns The requested configuration value.
   */
  protected getConfiguration(_name: string): string {
    throw new MethodNotImplementedYetError('getConfiguration');
  }

  /**
   * Retrieves and validates a configuration value expected to be an `Environment`.
   * Ensures the value matches one of the allowed environments.
   *
   * This method must be implemented in the concrete configuration service.
   *
   * @returns The requested configuration value.
   */
  protected getConfigurationAsEnvironment(_name: string): Environment {
    throw new MethodNotImplementedYetError('getConfigurationAsEnvironment');
  }

  /**
   * Retrieves and parses a configuration value as a number.
   * Validates that the value is a numeric string and returns its number representation.
   *
   * This method must be implemented in the concrete configuration service.
   *
   * @returns The requested configuration value.
   */
  protected getConfigurationAsNumber(_name: string): number {
    throw new MethodNotImplementedYetError('getConfigurationAsNumber');
  }

  /**
   * Loads the environment variables from a file.
   */
  protected load(): void {
    throw new MethodNotImplementedYetError('load');
  }
}