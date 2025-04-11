import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { ApiError } from './api.types';
import { ApiBaseError, InternalServerError } from './api.errors';
import { LoggerFactory } from '@services/logger';

const loggerService = LoggerFactory.create('api-service');

export const applyRequestMiddleware = (app: Express) => {
  app.use(cors());
  app.use(express.json({ type: 'application/vnd.api+json' }));
};

export const applyResponseMiddleware = (app: Express) => {
  app.use(
    (
      error: Error,
      _request: Request,
      response: Response<ApiError>,
      _next: NextFunction,
    ) => {
      loggerService.error(error);

      const isInstanceOfBaseApiError = error instanceof ApiBaseError;

      const apiError = isInstanceOfBaseApiError ? error : new InternalServerError();

      response.status(apiError.status).json({
        code: apiError.code,
        detail: apiError.detail,
        status: apiError.status,
        title: apiError.title,
      });
    },
  );
};
