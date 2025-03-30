type EnvironmentVariables = {
  PORT: number;
  SALT_ROUNDS: number;
};

export const getEnvironmentVariables = (): EnvironmentVariables => {
  console.log('🤖 Loading server environment variables.');

  const { PORT, SALT_ROUNDS } = process.env;

  if (!PORT) {
    throw new Error("❌ Missing required environment variable: 'PORT'");
  }
  if (!SALT_ROUNDS) {
    throw new Error("❌ Missing required environment variable: 'SALT_ROUNDS'");
  }

  const parsedPort = Number(PORT);
  const parsedSaltRounds = Number(SALT_ROUNDS);

  if (isNaN(parsedPort)) {
    throw new Error(`❌ Invalid value '${PORT}' for 'PORT'. It must be a valid number`);
  }
  if (isNaN(parsedSaltRounds)) {
    throw new Error(`❌ Invalid value '${SALT_ROUNDS}' for 'SALT_ROUNDS'. It must be a valid number`);
  }

  return {
    PORT: parsedPort,
    SALT_ROUNDS: parsedSaltRounds,
  };
};
