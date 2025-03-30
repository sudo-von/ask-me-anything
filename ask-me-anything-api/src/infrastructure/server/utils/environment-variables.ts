type EnvironmentVariables = {
  PORT: number;
};

export const getEnvironmentVariables = (): EnvironmentVariables => {
  console.log('🤖 Loading server environment variables.');

  const { PORT } = process.env;

  if (!PORT) {
    throw new Error("❌ Missing required environment variable: 'PORT'");
  }

  const parsedPort = Number(PORT);

  if (isNaN(parsedPort)) {
    throw new Error(`❌ Invalid value '${PORT}' for 'PORT'. It must be a valid number`);
  }

  return {
    PORT: parsedPort,
  };
};
