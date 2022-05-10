const express = require('express');

const { alive } = require('../controllers/health.controller');

const router = express.Router();

router.get('/alive', alive);

module.exports = router;
