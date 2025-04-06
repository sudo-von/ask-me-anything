import path from 'path';
import { Express } from 'express';
import { initialize } from 'express-openapi';
import { applyRequestMiddleware, applyResponseMiddleware } from './middlewares';
import { getLogger } from '@utils/logger';

const logger = getLogger();

export const start = async (app: Express) => {
  /* 📄 Docs. */
  const apiDoc = path.join(
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
  applyRequestMiddleware(app, apiDoc);

  /* ⚙️ Configuration. */
  const paths = path.join(__dirname, '..', '..', 'server', 'routes');

  await initialize({
    apiDoc,
    app,
    paths,
    logger,
    pathsIgnore: /^(.*errors|.*index|.*mappers|.*test|.*types)$/,
    promiseMode: true,
    routesGlob: '**/*.{ts,js}',
    routesIndexFileRegExp: /(?:endpoints)?\.[tj]s$/,
    validateApiDoc: true,
  });

  /* 📡 Common response middlewares. */
  applyResponseMiddleware(app);
};
