"use strict";

const express = require('express');
const IndexController = require('../controllers');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();


router.get('/', ensureAuthenticated, IndexController.getAllPosts);


module.exports = router;