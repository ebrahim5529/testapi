const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const logger = require('./utils/logger');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/customers', customerRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  logger.error(message);
  res.status(status).json({ error: message });
});

module.exports = app;
