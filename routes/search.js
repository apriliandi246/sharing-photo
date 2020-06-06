"use strict";

const express = require('express');
const ControllerSearch = require('../controllers/search');
const {
   ensureAuthenticated
} = require('../config/auth');
const router = express();


// search another user
router.get('/', ensureAuthenticated, ControllerSearch.search_another_user);


module.exports = router;