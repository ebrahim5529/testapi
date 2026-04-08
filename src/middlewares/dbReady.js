const { sequelize } = require('../config/db');

async function dbReady(req, res, next) {
  try {
    await sequelize.authenticate();
    next();
  } catch (error) {
    return res.status(503).json({ error: 'Database not connected' });
  }
}

module.exports = dbReady;
