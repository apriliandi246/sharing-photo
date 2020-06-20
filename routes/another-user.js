"use strict";

const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const ControllerAnotherUser = require('../controllers/another-user');
const router = express.Router();


// visit another user account
router.get('/:name', ensureAuthenticated, ControllerAnotherUser.renderUserProfile);


module.exports = router;