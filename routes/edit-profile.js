"use strict";

const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const ControllerEditProfile = require('../controllers/edit-profile');
const router = express.Router();


// render edit page
router.get('/edit', ensureAuthenticated, ControllerEditProfile.renderEditMyProfilePage);


// handle process edit
router.post('/edit', ensureAuthenticated, ControllerEditProfile.upload.single('picture'), ControllerEditProfile.editProfile);


module.exports = router;