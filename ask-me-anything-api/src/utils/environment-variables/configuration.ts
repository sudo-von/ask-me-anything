import dotenv from 'dotenv';
import path from 'path';
import { ENVIRONMENTS } from './constants';
import { Environment, EnvironmentVariables } from './types';

const getEnvironmentVariable = (name: string): string => {
  const environmentVariable = process.env[name];

  if (!environmentVariable) {
    throw new Error(`❌ Missing required environment variable: '${name}'`);
  }

  return environmentVariable;
};

const getEnvironmentVariableAsNumber = (name: string): number => {
  const environmentVariable = getEnvironmentVariable(name);

  const parsedEnvironmentVariable = Number(environmentVariable);

  if (isNaN(parsedEnvironmentVariable)) {
    throw new Error(
      `❌ Invalid value '${environmentVariable}' for '${name}'. It must be a valid number`,
    );
  }

  return parsedEnvironmentVariable;
};

const getEnvironmentVariableAsEnvironment = (name: string): Environment => {
  const environmentVariable = getEnvironmentVariable(name);

  const parsedEnvironmentVariable = ENVIRONMENTS.find(
    (environment) => environment === environmentVariable,
  );

  if (!parsedEnvironmentVariable) {
    throw new Error(
      `❌ Invalid value '${environmentVariable}' for '${name}'. It must contain a valid value from: '[${ENVIRONMENTS.join(',')}]'`,
    );
  }

  return parsedEnvironmentVariable;
};

export const getEnvironmentVariables = (): EnvironmentVariables => {
  console.log('🔒 Loading environment variables.');

  const { error } = dotenv.config({
    path: path.join(__dirname, '..', '..', '..', '.env'),
  });

  if (error) {
    throw new Error(`❌ Failed to load dotenv: ${error.message}.`);
  }

  const ENVIRONMENT = getEnvironmentVariableAsEnvironment('ENVIRONMENT');
  const PORT = getEnvironmentVariableAsNumber('PORT');
  const SALT_ROUNDS = getEnvironmentVariableAsNumber('SALT_ROUNDS');

  console.log('🔒 Environment variables loaded successfully.');

  return {
    ENVIRONMENT,
    PORT,
    SALT_ROUNDS,
  };
};
