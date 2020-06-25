'use strict';


const express = require('express');
const { forwardAuth } = require('../config/auth');
const Register = require('../controllers/register');
const router = express.Router();


// Render page form register
router.get('/register', forwardAuth, Register.renderRegisterPage);


// process register
router.post('/register', forwardAuth, Register.createNewUser);


module.exports = router;