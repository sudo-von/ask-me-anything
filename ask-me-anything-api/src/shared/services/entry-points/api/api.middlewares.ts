import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { ApiError } from './api.types';
import { ApiBaseError, InternalServerError } from './api.errors';
import { LoggerFactory } from '@services/logger';
import { STATUS_CODES } from './api.constants';

const loggerService = LoggerFactory.create(module);

/**
 * Global http-handling middleware for handling cors and headers.
 *
 * - CORS support using default settings.
 * - JSON body parsing for JSON:API specification.
 *
 * This middleware must be registered **before** all route handlers.
 *
 * @param app - The Express application instance.
 */
export const applyHttpRequestMiddleware = (app: Express) => {
  app.use(cors());
  app.use(express.json({ type: 'application/vnd.api+json' }));
};

/**
 * Applies middleware for handling incoming responses.
 *
 * @param app - The Express application instance.
 */
export const applyRequestMiddleware = (app: Express) => {
  applyHttpRequestMiddleware(app);
};

/**
 * Global error-handling middleware for formatting and returning API errors.
 *
 * - Logs the error using the appropriate log level:
 *   - `error` for server-side (5xx) errors.
 *   - `warn` for client-side (4xx) errors.
 * - Wraps unknown errors in a generic `InternalServerError`.
 * - Returns a standardized `ApiError` response structure.
 *
 * This middleware must be registered **after** all route handlers.
 *
 * @param app - The Express application instance.
 */
export const applyErrorResponseMiddleware = (app: Express) => {
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
 *
 * @param app - The Express application instance.
 */
export const applyResponseMiddleware = (app: Express) => {
  applyErrorResponseMiddleware(app);
};
