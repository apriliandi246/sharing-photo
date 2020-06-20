"use strict";


const express = require('express');
const Login = require('../controllers/login');
const { forwardAuth } = require('../config/auth');
const router = express.Router();


// render login page
router.get('/login', forwardAuth, Login.renderLoginPage);


// handling process login
router.post('/login', forwardAuth, Login.login);


module.exports = router;