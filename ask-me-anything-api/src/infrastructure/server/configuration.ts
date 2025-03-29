import express from 'express';
import path from 'path';
import { initialize } from 'express-openapi';
import { getEnvironmentVariables } from '@infrastructure/server/environment-variables';

export const start = async () => {
  try {
    const app = express();

    /* ⚙️ Middlewares. */
    app.use(express.json({ type: 'application/vnd.api+json' }))

    /* 🔧 Environment variables. */
    const { PORT } = getEnvironmentVariables();

    /* 📡 Middlewares. */
    app.use(express.json());

    /* 📄 OpenAPI. */
    const apiDoc = path.join(__dirname, '..', '..', '..', 'node_modules', '@sudo-von', 'ask-me-anything-core', 'openapi.yaml');
    const paths = path.join(__dirname, 'routes');
    await initialize({
      apiDoc,
      app,
      paths,
      promiseMode: true,
      validateApiDoc: true,
    });

    /* 🤖 Server. */
    app.listen(PORT, () => console.log(`🤖 Server is running on PORT:${PORT}.`));
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to start the handlers: ${error.message}.`;
    throw error;
  }
};