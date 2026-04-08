const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false, // Disable logging SQL queries to console
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    logger.info('MySQL Database connected successfully.');
    // await sequelize.sync({ force: false }); // Use { force: true } to drop existing tables
    // logger.info('All models were synchronized successfully.');
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error}`);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
