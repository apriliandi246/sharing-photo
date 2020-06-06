"use strict";


const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto').randomBytes(16).toString('hex');



// render edit profile page
module.exports.render_page_edit_profile = async (req, res) => {
   res.render("user_profile/edit_profile", {
      name: req.user.name
   });
}


// handle process edit profile
module.exports.edit_profile = async (req, res) => {
   // store all errors
   let errors = [];

   const {
      name
   } = req.body;

   const user = await User.findOne({
      name
   });

   // check filed name
   if (!name) {
      errors.push({
         msg: "please fill all fields"
      });
   }

   // check username is already in use or not
   if (user && name !== req.user.name) {
      errors.push({
         msg: "username is already in use"
      });
   }

   // check file type
   if (req.file !== undefined) {
      const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(req.file.mimetype);

      if (imageMimeTypes === false) {
         errors.push({
            msg: "image only"
         });
      }
   }

   // if have any error
   if (errors.length > 0) {
      if (req.file !== undefined) removeImage(`./public/uploads/user_picture/${req.file.filename}`);

      res.render('user_profile/edit_profile', {
         errors,
         name
      });

      // if there is no error
   } else {
      try {
         const user = await User.findById(req.user.id);
         user.name = name;

         if (req.file !== undefined) {
            // if filename is not default picture, update user picture and remove the old picture
            if (req.user.user_picture !== "default_picture.jpeg") {
               user.user_picture = req.file.filename;
               removeOldPicture(`./public/uploads/user_picture/${req.user.user_picture}`);

               // if filename is default_picture.jpeg, just update user picture
            } else {
               user.user_picture = req.file.filename;
            }
         }

         await user.save();
         res.redirect('/me');

      } catch (e) {
         console.log(e);
         return;
      }
   }
}


// handle upload user picture
const storage = multer.diskStorage({
   destination: './public/uploads/user_picture',
   filename: function (req, file, callback) {
      callback(null, crypto + "-" + Date.now() + path.extname(file.originalname));
   }
});

// remove image post, if post process is failed
const removeImage = (fileName) => {
   fs.unlink(fileName, (err) => {
      if (err) console.log(err);
   })
}

// if user update their profile picture, remove old picture
const removeOldPicture = (fileName) => {
   fs.unlink(fileName, (err) => {
      if (err) console.log(err);
   });
}

module.exports.upload = multer({
   storage: storage
});