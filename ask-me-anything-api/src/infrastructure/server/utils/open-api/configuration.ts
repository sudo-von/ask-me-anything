import path from 'path';
import { Express, NextFunction, Request, Response } from 'express';
import { initialize } from 'express-openapi';
import {
  openApiRequestMiddleware,
  openApiResponseMiddleware,
} from './middlewares';
import { HttpError, IHttpError } from '../http';
import { HttpError as OpenAPIError } from 'express-openapi-validator/dist/framework/types';

export const start = async (app: Express) => {
  /* 📄 Docs. */
  const openApi = path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    '..',
    'node_modules',
    '@sudo-von',
    'ask-me-anything-core',
    'openapi.yaml',
  );
  const paths = path.join(
    __dirname,
    '..',
    '..',
    'routes',
  );

  /* ⚙️ Configuration. */
  app.use(openApiRequestMiddleware({ apiSpec: openApi }));
  await initialize({
    apiDoc: openApi,
    app,
    paths,
    logger: console,
    pathsIgnore: /^(.*deserializers|.*errors|.*serializers|.*test|.*types)$/,
    promiseMode: true,
    routesGlob: '**/*.{ts,js}',
    routesIndexFileRegExp: /(?:endpoints)?\.[tj]s$/,
    validateApiDoc: true,
  });
  app.use((
    error: IHttpError,
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (error instanceof HttpError) {
        console.log({ code: error })
        response.status(error.statusCode).json({
          code: error.code,
          detail: error.detail,
          statusCode: error.statusCode,
          title: error.title,
        });
        return;
      }
      next();
    } catch (e) { console.log('abc', e) }
  });
  app.use((
    error: OpenAPIError,
    _request: Request,
    response: Response,
    _next: NextFunction
  ) => openApiResponseMiddleware({ error, response }));
};
