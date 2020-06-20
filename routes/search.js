"use strict";


const express = require('express');
const Search = require('../controllers/search');
const { ensureAuthenticated } = require('../config/auth');
const router = express();


// render search page
router.get('/', ensureAuthenticated, Search.renderSearchPage);


module.exports = router;