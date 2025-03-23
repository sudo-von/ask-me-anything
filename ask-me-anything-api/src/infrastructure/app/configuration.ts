import * as Database from '../database';
import * as Handlers from '../handlers';

export const start = async () => {
  console.log('💾 Trying to establish a database connection.');
  await Database.start();

  console.log('🤖 Trying to initialize the handlers.');
  Handlers.start();
};

export const close = async (error: unknown) => {
  try {
    console.error('❌ Failed to start the application. Attempting to release resources.', error);

    console.log('🖥️ Attempting to release resources.');
    await Database.close();
  } catch (error) {
    console.error('❌ Failed to release resources.', error);
  }
}