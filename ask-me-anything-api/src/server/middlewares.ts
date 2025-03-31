import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { Http } from '@utils';
import { InternalServerError } from '@server';

const { HttpError } = Http;

export const applyRequestMiddleware = (app: Express) => {
  app.use(cors());
  app.use(express.json({ type: 'application/vnd.api+json' }));
};

export const applyResponseMiddleware = (app: Express) => {
  app.use((
    error: Error,
    _request: Request,
    response: Response<Http.IHttpError>,
    _next: NextFunction,
  ) => {
    const isInstanceOfHttpError = error instanceof HttpError;
    const currentHttpError = isInstanceOfHttpError ? error : new InternalServerError();

    response.status(currentHttpError.status).json({
      code: currentHttpError.code,
      detail: currentHttpError.detail,
      status: currentHttpError.status,
      title: currentHttpError.title,
    });
  });
};