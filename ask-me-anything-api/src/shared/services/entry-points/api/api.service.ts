import express, { Express } from 'express';
import { Server } from 'http';
import { applyOpenApiMiddleware, applyOpenApiRequestMiddleware, applyOpenApiResponseMiddleware } from '@services/entry-points/api/services/openapi';
import { IApiService } from './api.types';
import { ConfigurationService } from '@services/configuration';
import { applyRequestMiddleware, applyResponseMiddleware } from './api.middlewares';
import { LoggerFactory } from '@services/logger';

const configurationService = new ConfigurationService();
const loggerService = LoggerFactory.create('api-service');

const PORT = configurationService.get('PORT');

export class ApiService implements IApiService {
  app?: Express;
  server?: Server;

  async init(): Promise<void> {
    try {
      loggerService.info('Trying to initialize the server.');

      this.app = express();

      applyRequestMiddleware(this.app);
      applyOpenApiRequestMiddleware(this.app);
      applyOpenApiMiddleware(this.app);
      applyOpenApiResponseMiddleware(this.app);
      applyResponseMiddleware(this.app);

      this.server = this.app.listen(PORT, () =>
        loggerService.info(
          `Server connection established successfully on 'PORT:${PORT}'.`,
        ),
      );
    } catch (e) {
      const error = e as Error;
      error.message = `Failed to init the server: ${error.message}.`;
      throw error;
    }
  };

  async close(): Promise<void> {
    try {
      if (!this.server) {
        loggerService.warn('Server connection not found.');
        return;
      }

      this.server.close((error) => {
        if (error) throw error;
      });
      loggerService.info('Server connection closed successfully.');
    } catch (e) {
      const error = e as Error;
      error.message = `Failed to close the server connection: ${error.message}.`;
      throw error;
    }
  };
}