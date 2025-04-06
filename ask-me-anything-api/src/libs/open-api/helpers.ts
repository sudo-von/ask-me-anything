import { Express, NextFunction, Request, Response } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { HttpError } from 'express-openapi-validator/dist/framework/types';
import { isValidStatusCodeKey, STATUS_CODES } from '@utils/http';
import { openApiPaths, openApiYaml } from './constants';
import { getLogger } from '@utils/logger';
import { initialize } from 'express-openapi';
import { ValidationError } from '@server/errors';

const logger = getLogger();

export const applyOpenApiMiddleware = (app: Express) =>
  initialize({
    apiDoc: openApiYaml,
    app,
    paths: openApiPaths,
    logger,
    pathsIgnore: /^(.*errors|.*index|.*mappers|.*test|.*types)$/,
    promiseMode: true,
    routesGlob: '**/*.{ts,js}',
    routesIndexFileRegExp: /(?:endpoints)?\.[tj]s$/,
    validateApiDoc: true,
  });

export const applyOpenApiRequestMiddleware = (app: Express) => {
  app.use(
    OpenApiValidator.middleware({
      apiSpec: openApiYaml,
      validateRequests: true,
      validateResponses: true,
    }),
  );
};

export const applyOpenApiResponseMiddleware = (app: Express) => {
  app.use(
    (
      error: Error,
      _request: Request,
      _response: Response,
      next: NextFunction,
    ) => {
      const isInstanceOfHttpError = error instanceof HttpError;

      if (!isInstanceOfHttpError) {
        return next(error);
      }

      const statusCodeKey = Object.keys(STATUS_CODES).find((statusCodeKey) =>
        isValidStatusCodeKey(statusCodeKey),
      );

      const statusCodeValue = statusCodeKey
        ? STATUS_CODES[statusCodeKey]
        : STATUS_CODES.INTERNAL_SERVER_ERROR;

      const validationError = new ValidationError({
        detail: error.message,
        status: statusCodeValue,
      });

      return next(validationError);
    },
  );
};
