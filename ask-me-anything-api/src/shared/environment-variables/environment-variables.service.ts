import dotenv from 'dotenv';
import path from 'path';
import { ENVIRONMENTS } from './environment-variables.constants.';
import { Environment, EnvironmentVariables, IEnvironmentVariablesService } from './environment-variables.types';

const { error } = dotenv.config({
  path: path.join(__dirname, '..', '..', '..', '.env'),
});

if (error) {
  error.message = `❌ Failed to start the environment variables service: ${error.message}`;
  throw error;
}

export class EnvironmentVariablesService implements IEnvironmentVariablesService {
  getEnvironmentVariable(name: string): string {
    const variable = process.env[name];

    if (!variable) {
      throw new Error(`❌ Missing required environment variable: '${name}'`);
    }

    return variable;
  };

  getEnvironmentVariableAsEnvironment(name: string): Environment {
    const variable = this.getEnvironmentVariable(name);

    const environmentVariable = ENVIRONMENTS.find(
      (environment) => environment === variable,
    );

    if (!environmentVariable) {
      throw new Error(
        `❌ Invalid value '${variable}' for '${name}'. It must contain a valid value from: '[${ENVIRONMENTS.join(',')}]'`,
      );
    }

    return environmentVariable;
  };

  getEnvironmentVariableAsNumber(name: string): number {
    const variable = this.getEnvironmentVariable(name);

    const parsedVariable = Number(variable);

    if (isNaN(parsedVariable)) {
      throw new Error(
        `❌ Invalid value '${variable}' for '${name}'. It must be a valid number`,
      );
    }

    return parsedVariable;
  };

  getEnvironmentVariables = (): EnvironmentVariables => {
    const ENVIRONMENT = this.getEnvironmentVariableAsEnvironment('ENVIRONMENT');
    const PORT = this.getEnvironmentVariableAsNumber('PORT');
    const SALT_ROUNDS = this.getEnvironmentVariableAsNumber('SALT_ROUNDS');
    const SECRET_KEY = this.getEnvironmentVariable('SECRET_KEY');

    return {
      ENVIRONMENT,
      PORT,
      SALT_ROUNDS,
      SECRET_KEY,
    };
  };
}