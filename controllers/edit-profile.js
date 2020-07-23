'use strict';


const fs = require('fs');
const path = require('path');
const multer = require('multer');
const User = require('../models/user');
const crypto = require('crypto').randomBytes(16).toString('hex');


function renderEditMyProfilePage(req, res) {
   res.render('user/edit-profile', {
      name: req.user.name
   });
}


async function editProfile(req, res) {
   const errors = [];
   const userData = req.user;
   const name = req.body.name;
   const fileInput = req.file;
   const user = await User.findOne({ name });
   const defaultPictureName = 'default-picture.jpeg';
   const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

   if (!name) {
      errors.push({ msg: 'please fill all fields' });
   }

   if (user !== null && user.name !== userData.name) {
      errors.push({ msg: 'username is already in use' });
   }

   if (fileInput !== undefined && !imageMimeTypes.includes(fileInput.mimetype)) {
      errors.push({ msg: 'image only' });
   }

   if (errors.length > 0) {
      if (fileInput !== undefined) {
         removeOldPicture(`./public/uploads/user-picture/${fileInput.filename}`);
      }

      res.render('user/edit-profile', {
         name,
         errors
      });

   } else {
      try {
         const user = await User.findById(req.user.id);

         user.name = name;

         if (fileInput !== undefined) {
            if (userData.user_picture !== defaultPictureName) {
               user.user_picture = fileInput.filename;
               removeOldPicture(`./public/uploads/user-picture/${userData.user_picture}`);

            } else {
               user.user_picture = fileInput.filename;
            }
         }

         await user.save();
         res.redirect('/me');

      } catch (err) {
         console.error(err);
         return;
      }
   }
}


const storage = multer.diskStorage({
   destination: './public/uploads/user-picture',
   filename: (req, file, callback) => {
      callback(null, crypto + '-' + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({ storage }).single('picture');

const removeOldPicture = (fileName) => {
   fs.unlink(fileName, (err) => {
      if (err) {
         console.error(err);
         return;
      }
   });
}


module.exports = {
   upload,
   editProfile,
   renderEditMyProfilePage
}