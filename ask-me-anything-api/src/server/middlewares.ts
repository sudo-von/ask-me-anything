import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { HttpError, IHttpError } from '@utils/http';
import { getLogger } from '@utils/logger';
import { InternalServerError } from './errors';

const logger = getLogger();

export const applyRequestMiddleware = (app: Express) => {
  app.use(cors());
  app.use(express.json({ type: 'application/vnd.api+json' }));
};

export const applyResponseMiddleware = (app: Express) => {
  app.use(
    (
      error: Error,
      _request: Request,
      response: Response<IHttpError>,
      _next: NextFunction,
    ) => {
      logger.error(error);

      const isInstanceOfHttpError = error instanceof HttpError;

      const httpError = isInstanceOfHttpError ? error : new InternalServerError();

      response.status(httpError.status).json({
        code: httpError.code,
        detail: httpError.detail,
        status: httpError.status,
        title: httpError.title,
      });
    },
  );
};
