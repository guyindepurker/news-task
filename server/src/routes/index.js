const express = require('express');

const { API_PREFIX } = require('../utils/constants');
const healthRoutes = require('./health.router');
const newsRoutes = require('./news.router');
const userRoutes = require('./user.router');

const router = express.Router();

router.use(API_PREFIX, healthRoutes);
router.use(API_PREFIX, newsRoutes);
router.use(API_PREFIX, userRoutes);

module.exports = router;
