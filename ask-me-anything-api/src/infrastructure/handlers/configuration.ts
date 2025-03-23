import express from 'express';

export const start = () => {
  try {
    const app = express();
    const port = parseInt(process.env.PORT || '3000');

    app.get('/', (_req, res) => {
      res.json({ message: 'Hello World' });
    });

    app.listen(port, () => console.log(`🤖 Handlers are running on {port}:${port}`));
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to start the handlers: ${error.message}.`;
    throw error;
  }
};