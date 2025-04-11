import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '@user-app/data-access/models/user.model';
import { IDataAccessService } from './data-access.types';
import { LoggerFactory } from '@services/logger';

const logger = LoggerFactory.create('shared-data-access-service');

export class DataAccessService implements IDataAccessService {
  connection: Sequelize;

  constructor() {
    const storage = path.join(
      process.cwd(),
      'ask-me-anything-database',
      'ask-me-anything.db',
    );

    this.connection = new Sequelize({
      dialect: 'sqlite',
      logging: false,
      models: [UserModel],
      storage,
    });
  }

  async init(): Promise<void> {
    try {
      logger.info('Trying to establish a database connection.');

      await this.connection.authenticate();

      await this.connection.sync({ force: true });

      logger.info('Database connection established successfully.');
    } catch (e) {
      const error = e as Error;
      error.message = `Failed to start the database connection: ${error.message}.`;
      throw error;
    }
  };

  async close(): Promise<void> {
    try {
      if (!this.connection) {
        logger.warn('Database connection not found.');
        return;
      }

      await this.connection.close();
      logger.info('💾 Database connection closed successfully.');
    } catch (e) {
      const error = e as Error;
      error.message = `Failed to close the database connection: ${error.message}.`;
      throw error;
    }
  };

}

