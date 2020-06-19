"use strict";

const express = require('express');
const ControllerAnotherUser = require('../controllers/another-user');
const {
   ensureAuthenticated
} = require('../config/auth');
const router = express.Router();


// visit another user account
router.get('/:name', ensureAuthenticated, ControllerAnotherUser.visit_another_user);


module.exports = router;