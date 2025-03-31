import dotenv from 'dotenv';
import path from 'path';

type EnvironmentVariables = {
  PORT: number;
  SALT_ROUNDS: number;
};

const getEnvironmentVariable = (name: string): string => {
  const environmentVariable = process.env[name];

  if (!environmentVariable) {
    throw new Error(`❌ Missing required environment variable: '${name}'`);
  }

  return environmentVariable;
};

const getEnvironmentVariables = (): EnvironmentVariables => {
  console.log('🔒 Loading environment variables.');

  const { error } = dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') });

  if (error) {
    throw new Error(`❌ Failed to load dotenv: ${error.message}.`);
  }

  const PORT = getEnvironmentVariable('PORT');
  const SALT_ROUNDS = getEnvironmentVariable('SALT_ROUNDS');

  const parsedPort = parseEnvironmentVariable('PORT', PORT);
  const parsedSaltRounds = parseEnvironmentVariable('SALT_ROUNDS', SALT_ROUNDS);

  console.log('🔒 Environment variables loaded successfully.');

  return {
    PORT: parsedPort,
    SALT_ROUNDS: parsedSaltRounds,
  };
};

const parseEnvironmentVariable = (name: string, value: string): number => {
  const parsedEnvironmentVariable = Number(value);

  if (isNaN(parsedEnvironmentVariable)) {
    throw new Error(`❌ Invalid value '${parsedEnvironmentVariable}' for '${name}'. It must be a valid number`);
  }

  return parsedEnvironmentVariable;
};

export const environmentVariables = getEnvironmentVariables();