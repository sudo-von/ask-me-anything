import * as Database from '@infrastructure/database';
import * as Handlers from '@infrastructure/handlers';

export const start = async () => {
  try {
    console.log('💾 Trying to establish a database connection.');
    await Database.start();

    console.log('🤖 Trying to initialize the handlers.');
    Handlers.start();
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to start the application: ${error.message}`;
    throw error;
  }
};

export const release = async () => {
  try {
    console.log('💻 Attempting to release resources.');
    await Database.close();
    console.log('💻 Resources released successfully.');
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to release resources: ${error.message}.`;
    throw error;
  }
}