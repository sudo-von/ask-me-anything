import { AppsBaseError } from '@apps/apps.error';
import { ENVIRONMENTS } from './configuration.constant';

/**
 * Thrown when a configuration value intended to represent an environment is invalid.
 *
 * This typically occurs when the value of a required configuration variable does not match
 * any of the allowed environments defined in the ENVIRONMENTS constant.
 */
export class InvalidConfigurationEnvironmentError extends AppsBaseError {
  constructor(configurationName: string, configurationValue: string) {
    super(
      `Invalid value '${configurationValue}' for '${configurationName}' configuration. It must contain a valid value from: '[${ENVIRONMENTS.join(',')}]'.`,
    );
  }
}

/**
 * Thrown when a configuration value expected to be numeric fails validation.
 *
 * This occurs when the environment variable exists but contains a non-numeric string.
 */
export class InvalidConfigurationAsNumberError extends AppsBaseError {
  constructor(configurationName: string, configurationValue: string) {
    super(`Invalid value '${configurationValue}' for '${configurationName}' configuration. It must be a valid number.`);
  }
}

/**
 * Thrown when a required configuration value is missing from the environment.
 *
 * This is used to signal a startup failure due to an undefined or unset environment variable.
 */
export class MissingConfigurationError extends AppsBaseError {
  constructor(configurationName: string) {
    super(`Missing required configuration: '${configurationName}'.`);
  }
}
