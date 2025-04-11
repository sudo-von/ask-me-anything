import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '@apps/user-app/data-access/models/user.model';

export class DataAccessService {
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
      console.log('💾 Trying to establish a database connection.');

      await this.connection.authenticate();

      await this.connection.sync({ force: true });

      console.log('💾 Database connection established successfully.');
    } catch (e) {
      const error = e as Error;
      error.message = `❌ Failed to start the database connection: ${error.message}.`;
      throw error;
    }
  };

  async close(): Promise<void> {
    try {
      if (!this.connection) {
        console.log('💾 Database connection not found.');
        return;
      }

      await this.connection.close();
      console.log('💾 Database connection closed successfully.');
    } catch (e) {
      const error = e as Error;
      error.message = `❌ Failed to close the database connection: ${error.message}.`;
      throw error;
    }
  };

}

