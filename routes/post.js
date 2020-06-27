'use strict';


const express = require('express');
const Post = require('../controllers/post');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();


router.get('/', ensureAuthenticated, Post.renderPostPage);

router.post('/', ensureAuthenticated, Post.upload, Post.post);


module.exports = router;