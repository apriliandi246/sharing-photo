'use strict';


const express = require('express');
const Post = require('../controllers/post');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();


// render page post
router.get('/', ensureAuthenticated, Post.renderPostPage);

// handle process post
router.post('/', ensureAuthenticated, Post.upload.single('picture'), Post.post);


module.exports = router;