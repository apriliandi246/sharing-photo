"use strict";

const express = require('express');
const ControllerPost = require('../controllers/post');
const {
      ensureAuthenticated
} = require('../config/auth');
const {
      upload
} = require('../upload/upload');
const router = express.Router();



// render page post
router.get('/', ensureAuthenticated, ControllerPost.render_make_post_page);

// handle process post
router.post('/', ensureAuthenticated, upload.single('picture'), ControllerPost.make_post);


module.exports = router;