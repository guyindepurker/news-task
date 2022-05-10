const winston = require('winston');
const path = require('path');

const { basePathServer } = require('../utils/constants');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(basePathServer, '/logs/logs.log'),
      level: 'info',
    }),
  ],
});

module.exports = { logger };
