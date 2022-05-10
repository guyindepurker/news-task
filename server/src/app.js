const express = require('express');
const cors = require('cors');
const path = require('path');
const appRouter = require('./routes');
const { clientBuild } = require('./utils/constants');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(clientBuild)));
  app.get('/**', (req, res) => {
    res.sendFile(path.join(clientBuild, 'index.html'));
  });
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.use(express.json());
app.use(express.urlencoded());
app.use(appRouter);

module.exports = { app };
