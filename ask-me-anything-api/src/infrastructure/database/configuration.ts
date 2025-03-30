import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '@infrastructure/database';
import path from 'path';

let connection: Sequelize;

export const start = async () => {
  try {
    const storage = path.join(__dirname, '..', '..', '..', '..', 'ask-me-anything-database', 'ask-me-anything.db');

    connection = new Sequelize({
      dialect: 'sqlite',
      models: [UserModel],
      storage,
    });

    await connection.authenticate();

    await connection.sync({ alter: true });

    console.log('💾 Database connection established successfully.');
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to start the database connection: ${error.message}.`;
    throw error;
  }
};

export const close = async () => {
  try {
    if (!connection) {
      console.log('💾 Database connection not found.');
      return;
    }

    await connection.close();
    console.log('💾 Database connection closed successfully.');
  } catch (e) {
    const error = e as Error;
    error.message = `❌ Failed to close the database connection: ${error.message}.`;
    throw error;
  }
};