"use strict";

const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const ControllerUserProfile = require('../controllers/me');
const router = express.Router();


// render user profile
router.get('/', ensureAuthenticated, ControllerUserProfile.renderMyProfile);


module.exports = router;