import express, { Errback, NextFunction, Request, Response } from 'express';
import path from 'path';
import { initialize } from 'express-openapi';
import * as OpenApiValidator from 'express-openapi-validator';
import { getEnvironmentVariables } from '@infrastructure/server/environment-variables';
import { ValidationError } from '@infrastructure/server';

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
      promiseMode: true,
      routesGlob: '**/*.{ts,js}',
      routesIndexFileRegExp: /(?:index)?\.[tj]s$/,
      validateApiDoc: true,
    });
    app.use(openApiResponseMiddleware);

    /* 🤖 Server. */
    app.listen(PORT, () => console.log(`🤖 Server is running on PORT:${PORT}.`));
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to start the server: ${error.message}.`;
    throw error;
  }
};