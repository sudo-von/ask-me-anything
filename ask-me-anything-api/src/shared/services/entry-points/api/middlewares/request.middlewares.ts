import cors from 'cors';
import express, { Express } from 'express';

/**
 * Middleware for handling headers.
 *
 * - CORS support using default settings.
 * - JSON body parsing for JSON:API specification.
 *
 * This middleware must be registered **before** all route handlers.
 */
const applyHeaderMiddlewares = (app: Express) => {
  app.use(cors());
  app.use(express.json({ type: 'application/vnd.api+json' }));
};

/**
 * Applies middlewares for handling incoming requests.
 */
export const applyRequestMiddlewares = (app: Express) => {
  applyHeaderMiddlewares(app);
};