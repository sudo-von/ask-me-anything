import * as Database from '@database';
import * as Server from '@server';

export const start = async () => {
  try {
    await Database.start();
    await Server.start();
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
    Server.close();

    console.log('💻 Resources released successfully.');
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to release resources: ${error.message}.`;
    throw error;
  }
};
