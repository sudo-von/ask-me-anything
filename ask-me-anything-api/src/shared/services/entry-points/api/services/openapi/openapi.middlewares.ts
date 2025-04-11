import { Express, NextFunction, Request, Response } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { HttpError } from 'express-openapi-validator/dist/framework/types';
import { initialize } from 'express-openapi';
import { LoggerFactory } from '@services/logger';
import { BadRequestError, isValidStatusCodeKey, STATUS_CODES } from '@services/entry-points/api';
import { openApiPaths, openApiYaml } from './openapi.constants';

const loggerService = LoggerFactory.create('api-service');

export const applyOpenApiMiddleware = (app: Express) =>
  initialize({
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

      const badRequestError = new BadRequestError({
        detail: error.message,
        status: statusCodeValue,
      });

      return next(badRequestError);
    },
  );
};
