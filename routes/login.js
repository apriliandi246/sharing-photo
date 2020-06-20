"use strict";

const express = require('express');
const { forwardAuth } = require('../config/auth');
const LoginController = require('../controllers/login');
const router = express.Router();


// render login page
router.get('/login', forwardAuth, LoginController.renderLoginPage);


// handling process login
router.post('/login', forwardAuth, LoginController.login);


module.exports = router;