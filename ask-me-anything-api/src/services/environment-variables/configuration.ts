import dotenv from 'dotenv';
import path from 'path';

export const start = () => {
  try {
    const { error } = dotenv.config({
      path: path.join(__dirname, '..', '..', '..', '.env'),
    });

    if (error) {
      throw error;
    }
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to start the environment variables service: ${error.message}`;
    throw error;
  }
};
