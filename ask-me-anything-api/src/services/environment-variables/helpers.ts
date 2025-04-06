import { ENVIRONMENTS } from './constants';
import { Environment, EnvironmentVariables } from './types';

const getEnvironmentVariable = (name: string): string => {
  const variable = process.env[name];

  if (!variable) {
    throw new Error(`❌ Missing required environment variable: '${name}'`);
  }

  return variable;
};

const getEnvironmentVariableAsNumber = (name: string): number => {
  const variable = getEnvironmentVariable(name);

  const parsedVariable = Number(variable);

  if (isNaN(parsedVariable)) {
    throw new Error(
      `❌ Invalid value '${variable}' for '${name}'. It must be a valid number`,
    );
  }

  return parsedVariable;
};

const getEnvironmentVariableAsEnvironment = (name: string): Environment => {
  const variable = getEnvironmentVariable(name);

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

export const getEnvironmentVariables = (): EnvironmentVariables => {
  const ENVIRONMENT = getEnvironmentVariableAsEnvironment('ENVIRONMENT');
  const PORT = getEnvironmentVariableAsNumber('PORT');
  const SALT_ROUNDS = getEnvironmentVariableAsNumber('SALT_ROUNDS');

  return {
    ENVIRONMENT,
    PORT,
    SALT_ROUNDS,
  };
};