import { Express } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { initialize } from 'express-openapi';
import { LoggerFactory } from '@services/logger';
import { openApiPaths, openApiYaml } from '../openapi.constants';

const loggerService = LoggerFactory.create(module);

/**
 * Middleware to initialize OpenAPI.
 *
 * This middleware must be registered **before** all route handlers.
 */
const initializeOpenApiMiddlewares = async (app: Express) => {
  await initialize({
    apiDoc: openApiYaml,
    app,
    paths: openApiPaths,
    logger: loggerService,
    pathsIgnore: /^(.*errors|.*index|.*mappers|.*test|.*types)$/,
    promiseMode: true,
    routesGlob: '**/*.{ts,js}',
    routesIndexFileRegExp: /(?:endpoints)?\.[tj]s$/,
    validateApiDoc: true,
  });
};

/**
 * Middleware to initialize OpenAPI validator.
 *
 * This middleware must be registered **before** all route handlers.
 */
const initializeOpenApiValidatorMiddlewares = (app: Express) => {
  app.use(
    OpenApiValidator.middleware({
      apiSpec: openApiYaml,
      validateRequests: true,
      validateResponses: true,
    }),
  );
};

/**
 * Applies OpenAPI middlewares for handling incoming requests.
 */
export const applyOpenApiRequestMiddlewares = async (app: Express) => {
  initializeOpenApiValidatorMiddlewares(app);
  await initializeOpenApiMiddlewares(app);
};