"use strict";

const express = require('express');
const LogoutController = require('../controllers/logout');
const router = express.Router();


// handle logout
router.get('/', LogoutController.logout);

module.exports = router;