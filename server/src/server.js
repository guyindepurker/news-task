const http = require('http');

const { app } = require('./app');
const { DBService } = require('./services/db.service');
const { logger } = require('./services/logger.service');

const port = parseInt(process.env.PORT || 3030);

DBService.connect();

const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});
