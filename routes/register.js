"use strict";

const express = require('express');
const { forwardAuth } = require('../config/auth');
const RegisterController = require('../controllers/register');
const router = express.Router();


// Render page form register
router.get('/register', forwardAuth, RegisterController.renderRegisterPage);


// process register
router.post('/register', forwardAuth, RegisterController.createNewUser);


module.exports = router;