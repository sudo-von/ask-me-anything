import path from 'path';
import { Express, NextFunction, Request, Response } from 'express';
import { HttpError } from 'express-openapi-validator/dist/framework/types';
import { initialize } from 'express-openapi';
import {
  openApiRequestMiddleware,
  openApiResponseMiddleware,
} from './middlewares';

export const configureOpenAPI = async (app: Express) => {
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
    pathsIgnore: /^(.*deserializers|.*serializers|.*test|.*types)$/,
    promiseMode: true,
    routesGlob: '**/*.{ts,js}',
    routesIndexFileRegExp: /(?:endpoints)?\.[tj]s$/,
    validateApiDoc: true,
  });
  app.use((
    error: HttpError,
    _request: Request,
    response: Response,
    _next: NextFunction
  ) => openApiResponseMiddleware({ error, response }));
};
