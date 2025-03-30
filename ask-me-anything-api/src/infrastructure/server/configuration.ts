import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { initialize } from 'express-openapi';
import * as OpenApiValidator from 'express-openapi-validator';
import { getEnvironmentVariables } from '@infrastructure/server/environment-variables';
import { ValidationError } from '@infrastructure/server';
import { Server } from 'http';

let server: Server;

export const start = async () => {
  try {
    const app = express();

    /* 📡 Common middlewares. */
    app.use(express.json({ type: 'application/vnd.api+json' }))

    /* 🔧 Environment variables. */
    const { PORT } = getEnvironmentVariables();

    /* 📄 OpenAPI docs. */
    const apiDoc = path.join(__dirname, '..', '..', '..', 'node_modules', '@sudo-von', 'ask-me-anything-core', 'openapi.yaml');
    const paths = path.join(__dirname, 'routes');

    /* 📡 OpenAPI middlewares. */
    const openApiRequestMiddleware = OpenApiValidator.middleware({
      apiSpec: apiDoc,
      validateRequests: true,
      validateResponses: true,
    });
    const openApiResponseMiddleware = (error: ValidationError, _request: Request, response: Response, next: NextFunction) => {
      response.status(error.status).json({
        message: error.message,
        errors: error.errors,
      })
    };

    /* ⚙️ OpenAPI configuration. */
    app.use(openApiRequestMiddleware);
    await initialize({
      apiDoc,
      app,
      paths,
      logger: console,
      pathsIgnore: /^(.*\.test|.*types)$/,
      promiseMode: true,
      routesGlob: '**/*.{ts,js}',
      routesIndexFileRegExp: /(?:index)?\.[tj]s$/,
      validateApiDoc: true,
    });
    app.use(openApiResponseMiddleware);

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