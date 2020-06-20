"use strict";


const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const EditProfile = require('../controllers/edit-profile');
const router = express.Router();


// render edit page
router.get('/edit', ensureAuthenticated, EditProfile.renderEditMyProfilePage);


// handle process edit
router.post('/edit', ensureAuthenticated, EditProfile.upload.single('picture'), EditProfile.editProfile);


module.exports = router;