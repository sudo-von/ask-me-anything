import { Sequelize } from "sequelize";
import path from 'path';

let connection: Sequelize;

export const start = async () => {
  try {
    const storage = path.join(__dirname, '..', '..', '..', '..', 'ask-me-anything-database', 'database');

    connection = new Sequelize({
      dialect: 'sqlite',
      logging: false,
      storage,
    });

    await connection.authenticate();
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