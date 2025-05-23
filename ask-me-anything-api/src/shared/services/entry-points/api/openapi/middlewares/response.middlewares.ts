import { Express, NextFunction, Request, Response } from 'express';
import { HttpError } from 'express-openapi-validator/dist/framework/types';
import {
  BadRequestError,
} from '@services/entry-points/api';

/**
 * Middleware for normalizing and forwarding HTTP errors in OpenAPI format.
 *
 * - Ensures all API errors conform to a consistent error schema.
 *
 * This middleware should be registered **after** all route and controller handlers.
 */
const applyOpenApiErrorMiddlewares = (app: Express) => {
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

      const badRequestError = new BadRequestError({
        detail: error.message,
      });

      return next(badRequestError);
    },
  );
};

/**
 * Applies middleware for handling outgoing OpenAPI responses.
 */
export const applyOpenApiResponseMiddlewares = (app: Express) => {
  applyOpenApiErrorMiddlewares(app);
};
