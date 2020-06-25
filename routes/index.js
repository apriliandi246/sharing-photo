'use strict';


const express = require('express');
const Index = require('../controllers');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();


router.get('/', ensureAuthenticated, Index.getAllPosts);


module.exports = router;