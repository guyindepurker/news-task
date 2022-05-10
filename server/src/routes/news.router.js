const express = require('express');

const { getNews } = require('../controllers/news.controller');
const { authUser } = require('../middleware/auth.middleware');
const { newsMiddleware } = require('../middleware/news.middleware');

const router = express.Router();

router.get('/get-news', authUser, newsMiddleware, getNews);

module.exports = router;
