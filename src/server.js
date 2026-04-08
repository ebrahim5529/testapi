require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB, sequelize } = require('./config/db');
const User = require('./models/userModel');
const Customer = require('./models/customerModel');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB();
    await sequelize.sync({ force: false }); // Use { force: true } to drop existing tables
    logger.info('All models were synchronized successfully.');
    const server = http.createServer(app);
    server.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    logger.error(`Failed to start: ${err.message}`);
    process.exit(1);
  }
}

start();
