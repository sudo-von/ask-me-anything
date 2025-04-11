import express, { Express } from 'express';
import { Server } from 'http';
import { applyOpenApiMiddleware, applyOpenApiRequestMiddleware, applyOpenApiResponseMiddleware } from '@src/shared/entry-points/api/open-api';
import { IApiService } from './api.types';
import { getEnvironmentVariables } from '@src/shared/services/environment-variables';
import { applyRequestMiddleware, applyResponseMiddleware } from './api.middlewares';

const { PORT } = getEnvironmentVariables();

export class ApiService implements IApiService {
  app?: Express;
  server?: Server;

  async init(): Promise<void> {
    try {
      console.info('🤖 Trying to initialize the server.');

      this.app = express();

      applyRequestMiddleware(this.app);
      applyOpenApiRequestMiddleware(this.app);
      applyOpenApiMiddleware(this.app);
      applyOpenApiResponseMiddleware(this.app);
      applyResponseMiddleware(this.app);

      this.server = this.app.listen(PORT, () =>
        console.info(
          `🤖 Server connection established successfully on 'PORT:${PORT}'.`,
        ),
      );
    } catch (e) {
      const error = e as Error;
      error.message = `❌ Failed to init the server: ${error.message}.`;
      throw error;
    }
  };

  async close(): Promise<void> {
    try {
      if (!this.server) {
        console.info('🤖 Server connection not found.');
        return;
      }

      this.server.close();
      console.info('🤖 Server connection closed successfully.');
    } catch (e) {
      const error = e as Error;
      error.message = `❌ Failed to close the server connection: ${error.message}.`;
      throw error;
    }
  };
}