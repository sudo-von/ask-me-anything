import { Express, NextFunction, Request, Response } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { HttpError } from 'express-openapi-validator/dist/framework/types';
import { Http } from '@utils';
import { ValidationError } from '@server';

const { HTTP_STATUS_CODES, isValidHttpStatusCodeKey } = Http;

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
      _response: Response<Http.IHttpError>,
      next: NextFunction,
    ) => {
      const isInstanceOfHttpError = error instanceof HttpError;

      if (!isInstanceOfHttpError) {
        return next(error);
      }

      const httpStatusCodeKey = Object.keys(HTTP_STATUS_CODES).find(
        (httpStatusCodeKey) =>
          isValidHttpStatusCodeKey(httpStatusCodeKey) &&
          HTTP_STATUS_CODES[httpStatusCodeKey] === error.status,
      );

      let httpStatusCodeValue: Http.HttpStatusCodeValue =
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      if (httpStatusCodeKey && isValidHttpStatusCodeKey(httpStatusCodeKey)) {
        httpStatusCodeValue = HTTP_STATUS_CODES[httpStatusCodeKey];
      }

      const validationError = new ValidationError({
        detail: error.message,
        status: httpStatusCodeValue,
      });
      return next(validationError);
    },
  );
};
