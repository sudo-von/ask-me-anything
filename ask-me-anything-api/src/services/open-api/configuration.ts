import path from 'path';
import { Express } from 'express';
import { initialize } from 'express-openapi';
import { OpenAPI } from '@services';

export const start = async (app: Express) => {
  /* 📄 Docs. */
  const openApi = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'node_modules',
    '@sudo-von',
    'ask-me-anything-core',
    'openapi.yaml',
  );

  /* 📡 Common request middlewares. */
  OpenAPI.applyRequestMiddleware(app, openApi);

  /* ⚙️ Configuration. */
  const paths = path.join(__dirname, '..', '..', 'server', 'routes');
  await initialize({
    apiDoc: openApi,
    app,
    paths,
    logger: console,
    pathsIgnore: /^(.*errors|.*index|.*mappers|.*test|.*types)$/,
    promiseMode: true,
    routesGlob: '**/*.{ts,js}',
    routesIndexFileRegExp: /(?:endpoints)?\.[tj]s$/,
    validateApiDoc: true,
  });

  /* 📡 Common response middlewares. */
  OpenAPI.applyResponseMiddleware(app);
};
