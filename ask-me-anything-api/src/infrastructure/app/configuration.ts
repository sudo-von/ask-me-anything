import dotenv from 'dotenv';
import path from 'path';
import * as Database from '@infrastructure/database';
import * as Server from '@infrastructure/server';

export const start = async () => {
  try {
    dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') });

    console.log('💾 Trying to establish a database connection.');
    await Database.start();

    console.log('🤖 Trying to initialize the server.');
    Server.start();
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