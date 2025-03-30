import express from 'express';
import { Server } from 'http';
import { EnvironmentVariables, OpenAPI } from '@infrastructure/server';

let server: Server;

export const start = async () => {
  try {
    const app = express();

    /* 📡 Common middlewares. */
    app.use(express.json({ type: 'application/vnd.api+json' }))

    /* 🔧 Environment variables. */
    const { PORT } = EnvironmentVariables.getEnvironmentVariables();

    /* 📡 OpenAPI. */
    await OpenAPI.start(app);

    /* 🤖 Server. */
    server = app.listen(PORT, () => console.log(`🤖 Server is running on PORT:${PORT}.`));
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to start the server: ${error.message}.`;
    throw error;
  }
};

export const close = () => {
  try {
    if (!server) {
      console.log('🤖 Server connection not found.');
      return;
    }

    server.close();
    console.log('🤖 Server connection closed successfully.');
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to close the server connection: ${error.message}.`;
    throw error;
  }
};