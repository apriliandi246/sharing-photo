const express = require('express');
const User = require('../models/User');
const {
      ensureAuthenticated
} = require('../config/auth');
const router = express();


router.get('/', ensureAuthenticated, (req, res) => {
      res.render('search/search');
});


router.post('/', ensureAuthenticated, async (req, res) => {


});


module.exports = router;