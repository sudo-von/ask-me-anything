import express, { Express, NextFunction, Request, Response } from 'express';
import { Http } from 'utils';
import { IHttpError } from 'utils/http';

const { HttpError, HTTP_STATUS_CODES } = Http;

export const requestMiddlewares = (app: Express) => {
  app.use(express.json({ type: 'application/vnd.api+json' }));
};

export const responseMiddlewares = (app: Express) => {
  app.use(
    (
      error: Error,
      _request: Request,
      response: Response<IHttpError>,
      _next: NextFunction,
    ) => {
      console.error(error);

      if (error instanceof HttpError) {
        const { code, detail, statusCode, title } = error;
        response.status(statusCode).json({
          code,
          detail,
          statusCode,
          title,
        });
        return;
      }

      const statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

      response.status(statusCode).json({
        code: 'INTERNAL_SERVER_ERROR',
        detail:
          'An unexpected error occurred on the server. Please try again later.',
        statusCode,
        title: 'Internal Server Error',
      });
    },
  );
};
