"use strict";

const express = require('express');
const LoginController = require('../controllers/login');
const {
      forwardAuth
} = require('../config/auth');
const router = express.Router();


// render login page
router.get('/login', forwardAuth, LoginController.render_login_page);


// handling process login
router.post('/login', forwardAuth, LoginController.login);


module.exports = router;