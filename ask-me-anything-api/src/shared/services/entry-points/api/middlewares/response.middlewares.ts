import { Express, NextFunction, Request, Response } from 'express';
import { ApiError } from '../api.types';
import { ApiBaseError, InternalServerError } from '../api.errors';
import { LoggerFactory } from '@services/logger';
import { STATUS_CODES } from '../api.constants';

const loggerService = LoggerFactory.create(module);

/**
 * Middleware for formatting and returning API errors.
 *
 * - Logs the error using the appropriate log level:
 * - Wraps unknown errors in a generic `InternalServerError`.
 * - Returns a standardized `ApiError` response structure.
 *
 * This middleware must be registered **after** all route handlers.
 */
const applyErrorMiddleware = (app: Express) => {
  app.use(
    (
      error: Error,
      _request: Request,
      response: Response<ApiError>,
      _next: NextFunction,
    ) => {
      const isInstanceOfBaseApiError = error instanceof ApiBaseError;

      const apiError = isInstanceOfBaseApiError
        ? error
        : new InternalServerError();

      if (apiError.status >= STATUS_CODES.INTERNAL_SERVER_ERROR) {
        loggerService.error(error);
      } else {
        loggerService.warn(error.message, error);
      }

      response.status(apiError.status).json({
        code: apiError.code,
        detail: apiError.detail,
        status: apiError.status,
        title: apiError.title,
      });
    },
  );
};

/**
 * Applies middleware for handling outgoing responses.
 */
export const applyResponseMiddlewares = (app: Express) => {
  applyErrorMiddleware(app);
};
