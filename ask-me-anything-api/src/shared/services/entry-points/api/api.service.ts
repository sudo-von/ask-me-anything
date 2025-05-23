import express, { Express } from 'express';
import { Server } from 'http';
import { IApiService } from './api.types';
import { ConfigurationService } from '@services/configuration';
import { applyRequestMiddlewares, applyResponseMiddlewares } from './middlewares';
import { LoggerFactory } from '@services/logger';
import { applyOpenApiRequestMiddlewares, applyOpenApiResponseMiddlewares } from './openapi/middlewares';

const configurationService = ConfigurationService.getInstance();
const loggerService = LoggerFactory.create(module);

const PORT = configurationService.get('PORT');

export class ApiService implements IApiService {
  app?: Express;
  server?: Server;

  async init(): Promise<void> {
    try {
      loggerService.info('Trying to initialize the server.');

      this.app = express();

      applyRequestMiddlewares(this.app);
      applyOpenApiRequestMiddlewares(this.app);
      applyOpenApiResponseMiddlewares(this.app);
      applyResponseMiddlewares(this.app);

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
        if (error) {
          throw error;
        }
      });

      loggerService.info('Server connection closed successfully.');
    } catch (e) {
      const error = e as Error;
      error.message = `Failed to close the server connection: ${error.message}.`;
      throw error;
    }
  };
}