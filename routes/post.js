"use strict";

const express = require('express');
const ControllerPost = require('../controllers/post');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();


// render page post
router.get('/', ensureAuthenticated, ControllerPost.renderPostPage);

// handle process post
router.post('/', ensureAuthenticated, ControllerPost.upload.single('picture'), ControllerPost.post);


module.exports = router;