"use strict";

const express = require('express');
const ControllerEditProfile = require('../controllers/edit_profile');
const {
      ensureAuthenticated
} = require('../config/auth');
const {
      upload2
} = require('../upload/upload');
const router = express.Router();



// render edit page
router.get('/edit', ensureAuthenticated, ControllerEditProfile.render_page_edit_profile);


// handle process edit
router.post('/edit', ensureAuthenticated, upload2.single('picture'), ControllerEditProfile.edit_profile);


module.exports = router;