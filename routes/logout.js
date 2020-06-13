"use strict";

const express = require('express');
const router = express.Router();
const LogoutController = require('../controllers/logout');


// handle logout
router.get('/', LogoutController.logout);


module.exports = router;