// declare express router
const express = require('express');
const router = express.Router();

const authController = require('./controller');

// route to login
router.post('/login', authController.login);

// export routes
module.exports = router;
