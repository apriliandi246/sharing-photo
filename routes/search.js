"use strict";

const express = require('express');
const ControllerSearch = require('../controllers/search');
const { ensureAuthenticated } = require('../config/auth');
const router = express();


// render search page
router.get('/', ensureAuthenticated, ControllerSearch.renderSearchPage);


module.exports = router;