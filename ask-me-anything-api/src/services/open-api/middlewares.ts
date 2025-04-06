import { Express, NextFunction, Request, Response } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { HttpError } from 'express-openapi-validator/dist/framework/types';
import { ValidationError } from '@server';
import { isValidStatusCodeKey, STATUS_CODES } from '@utils/http';

export const applyRequestMiddleware = (app: Express, apiSpec: string) => {
  app.use(
    OpenApiValidator.middleware({
      apiSpec,
      validateRequests: true,
      validateResponses: true,
    }),
  );
};

export const applyResponseMiddleware = (app: Express) => {
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
