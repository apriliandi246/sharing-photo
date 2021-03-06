'use strict';


const express = require('express');
const UserProfile = require('../controllers/me');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();


router.get('/', ensureAuthenticated, UserProfile.renderMyProfile);


module.exports = router;