import dotenv from 'dotenv';
import path from 'path';
import { ENVIRONMENTS } from './configuration.constants.';
import { Environment, ConfigurationKey, Configuration, IConfigurationService } from './configuration.types';

const { error } = dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

if (error) {
  error.message = `❌ Failed to start the environment variables service: ${error.message}`;
  throw error;
}

export class ConfigurationService implements IConfigurationService {
  get = <T extends ConfigurationKey>(configurationKey: T): Configuration[T] => {
    const ENVIRONMENT = this.getConfigurationAsEnvironment('ENVIRONMENT');
    const PORT = this.getConfigurationAsNumber('PORT');
    const SALT_ROUNDS = this.getConfigurationAsNumber('SALT_ROUNDS');
    const SECRET_KEY = this.getConfiguration('SECRET_KEY');

    const configuration: Configuration = {
      ENVIRONMENT,
      PORT,
      SALT_ROUNDS,
      SECRET_KEY,
    };

    return configuration[configurationKey];
  };

  private getConfiguration(name: string): string {
    const configuration = process.env[name];

    if (!configuration) {
      throw new Error(`❌ Missing required configuration: '${name}'`);
    }

    return configuration;
  };

  private getConfigurationAsEnvironment(name: string): Environment {
    const configuration = this.getConfiguration(name);

    const environment = ENVIRONMENTS.find(
      (environment) => environment === configuration,
    );

    if (!environment) {
      throw new Error(
        `❌ Invalid value '${configuration}' for '${name}' configuration. It must contain a valid value from: '[${ENVIRONMENTS.join(',')}]'`,
      );
    }

    return environment;
  };

  private getConfigurationAsNumber(name: string): number {
    const configuration = this.getConfiguration(name);

    const parsedConfiguration = Number(configuration);

    if (isNaN(parsedConfiguration)) {
      throw new Error(
        `❌ Invalid value '${configuration}' for '${name}' configuration. It must be a valid number`,
      );
    }

    return parsedConfiguration;
  };
}