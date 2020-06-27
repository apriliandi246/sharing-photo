'use strict';


const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const EditProfile = require('../controllers/edit-profile');
const router = express.Router();


router.get('/edit', ensureAuthenticated, EditProfile.renderEditMyProfilePage);

router.post('/edit', ensureAuthenticated, EditProfile.upload, EditProfile.editProfile);


module.exports = router;