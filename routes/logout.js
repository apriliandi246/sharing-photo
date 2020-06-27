'use strict';


const express = require('express');
const router = express.Router();
const Logout = require('../controllers/logout');


router.get('/', Logout.logout);


module.exports = router;