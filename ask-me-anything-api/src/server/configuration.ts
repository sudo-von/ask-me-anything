import express from 'express';
import { Server } from 'http';
import { applyRequestMiddleware, applyResponseMiddleware } from '@server';
import { getLogger } from '@utils/logger';
import { getEnvironmentVariables } from '@services/environment-variables';
import { applyOpenApiMiddleware, applyOpenApiRequestMiddleware, applyOpenApiResponseMiddleware } from 'libs/open-api';

const { PORT } = getEnvironmentVariables();

const logger = getLogger();

let server: Server;

export const start = async () => {
  try {
    logger.info('🤖 Trying to initialize the server.');

    const app = express();

    applyRequestMiddleware(app);
    applyOpenApiRequestMiddleware(app);
    applyOpenApiMiddleware(app);
    applyOpenApiResponseMiddleware(app);
    applyResponseMiddleware(app);

    server = app.listen(PORT, () =>
      logger.info(
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
      logger.info('🤖 Server connection not found.');
      return;
    }

    server.close();
    logger.info('🤖 Server connection closed successfully.');
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to close the server connection: ${error.message}.`;
    throw error;
  }
};
