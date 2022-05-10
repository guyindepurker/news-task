const express = require('express');

const { autoLogin, login } = require('../controllers/user.controller');
// const { authUser } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/login', login);
router.post('/auto-login', autoLogin);

module.exports = router;
