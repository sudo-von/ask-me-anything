import express from 'express';
import { Server } from 'http';
import { OpenAPI } from '@services';
import { EnvironmentVariables } from '@utils';
import { applyRequestMiddleware, applyResponseMiddleware } from '@server';

let server: Server;

export const start = async () => {
  try {
    console.log('🤖 Trying to initialize the server.');

    const app = express();

    /* 📡 Common request middlewares. */
    applyRequestMiddleware(app);

    /* 🔒 Environment variables. */
    const { PORT } = EnvironmentVariables.environmentVariables;

    /* 🔧 OpenAPI. */
    await OpenAPI.start(app);

    /* 📡 Common response middlewares. */
    applyResponseMiddleware(app);

    /* 🤖 Server. */
    server = app.listen(PORT, () =>
      console.log(
        `🤖 Server connection established successfully on 'PORT:${PORT}'.`,
      ),
    );
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
