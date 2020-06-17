"use strict";

const express = require('express');
const ControllerUserProfile = require('../controllers/me');
const {
   ensureAuthenticated
} = require('../config/auth');
const router = express.Router();


// render user profile
router.get('/', ensureAuthenticated, ControllerUserProfile.render_user_profile_page);


module.exports = router;