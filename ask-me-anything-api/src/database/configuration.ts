import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import { UserModel } from './models';
import { getLogger } from '@utils/logger';
import { getEnvironmentVariables } from '@services/environment-variables';

const { ENVIRONMENT } = getEnvironmentVariables();

const isDevelopment = ENVIRONMENT === 'development';

const logger = getLogger();

let connection: Sequelize;

export const start = async () => {
  try {
    logger.info('💾 Trying to establish a database connection.');

    const storage = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'ask-me-anything-database',
      'ask-me-anything.db',
    );

    connection = new Sequelize({
      dialect: 'sqlite',
      logging: false,
      models: [UserModel],
      storage,
    });

    await connection.authenticate();

    await connection.sync({ force: isDevelopment });

    logger.info('💾 Database connection established successfully.');
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to start the database connection: ${error.message}.`;
    throw error;
  }
};

export const close = async () => {
  try {
    if (!connection) {
      logger.info('💾 Database connection not found.');
      return;
    }

    await connection.close();
    logger.info('💾 Database connection closed successfully.');
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to close the database connection: ${error.message}.`;
    throw error;
  }
};
