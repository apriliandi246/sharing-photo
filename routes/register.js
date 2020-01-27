"use strict";

const express = require('express');
const RegisterController = require('../controllers/register');
const {
      upload2
} = require('../upload/upload');
const {
      forwardAuth
} = require('../config/auth');
const router = express.Router();



// Render page form register
router.get('/register', forwardAuth, RegisterController.render_register_page);

// process register
router.post('/register', forwardAuth, upload2.single('picture'), RegisterController.create_new_user);

module.exports = router;