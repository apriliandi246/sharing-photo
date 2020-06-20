"use strict";


const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const AnotherUser = require('../controllers/another-user');
const router = express.Router();


// visit another user account
router.get('/:name', ensureAuthenticated, AnotherUser.renderUserProfile);


module.exports = router;