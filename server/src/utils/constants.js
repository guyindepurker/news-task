const path = require('path');

const basePathServer = path.join(__dirname, '../');

const API_PREFIX = '/api';

const apiKey = process.env.API_KEY;

const baseUrlApiNews = `http://newsapi.org/v2/everything?language=en&pageSize=100&sortBy=publishedAt&apiKey=${apiKey}`;

const SOURCE = 'bbc-news';

const clientBuild = path.join(__dirname, '../', '../', '../', 'client/build');

module.exports = {
  basePathServer,
  API_PREFIX,
  baseUrlApiNews,
  SOURCE,
  clientBuild,
};
