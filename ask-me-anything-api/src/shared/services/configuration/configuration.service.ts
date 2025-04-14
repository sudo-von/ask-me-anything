import dotenv from 'dotenv';
import path from 'path';
import { ENVIRONMENTS } from './configuration.constant';
import {
  Environment,
  ConfigurationKey,
  Configuration,
  IConfigurationService,
} from './configuration.types';
import { AbstractConfiguration } from './configuration.abstract';
import {
  InvalidConfigurationAsNumberError,
  InvalidConfigurationEnvironmentError,
  MissingConfigurationError,
} from './configuration.error';
import { ServiceInitializationError } from '@apps/apps.error';

export class ConfigurationService extends AbstractConfiguration implements IConfigurationService {
  private static instance: ConfigurationService;
  private configuration: Configuration;

  protected constructor() {
    super();
    this.load();
    this.configuration = {
      ENVIRONMENT: this.getConfigurationAsEnvironment('ENVIRONMENT'),
      PORT: this.getConfigurationAsNumber('PORT'),
      SALT_ROUNDS: this.getConfigurationAsNumber('SALT_ROUNDS'),
      SECRET_KEY: this.getConfiguration('SECRET_KEY'),
    };
  }

  public get = <T extends ConfigurationKey>(key: T): Configuration[T] => {
    return this.configuration[key];
  };

  protected getConfiguration(name: string): string {
    const value = process.env[name];

    if (!value) {
      throw new MissingConfigurationError(name);
    }

    return value;
  }

  protected getConfigurationAsEnvironment(name: string): Environment {
    const value = this.getConfiguration(name);

    const environment = ENVIRONMENTS.find(
      (environment) => environment === value,
    );

    if (!environment) {
      throw new InvalidConfigurationEnvironmentError(name, value);
    }

    return environment;
  }

  protected getConfigurationAsNumber(name: string): number {
    const value = this.getConfiguration(name);

    const parsedConfiguration = Number(value);

    if (isNaN(parsedConfiguration)) {
      throw new InvalidConfigurationAsNumberError(name, value);
    }

    return parsedConfiguration;
  }

  public static getInstance(): ConfigurationService {
    if (!this.instance) {
      this.instance = new ConfigurationService();
    }
    return this.instance;
  }

  protected load(): void {
    const { error } = dotenv.config({
      path: path.join(process.cwd(), '.env'),
    });

    if (error) {
      throw new ServiceInitializationError(
        'ConfigurationService',
        error.message,
      );
    }
  }
}
