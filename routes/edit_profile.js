const {
      ensureAuthenticated
} = require('../config/auth');
const express = require('express');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();


// handle process upload 
const storage = multer.diskStorage({
      destination: './public/uploads/user_picture',
      filename: function (req, file, callback) {
            callback(null, "user-" + file.fieldname + '-' + Date.now() + '-' + Math.floor(Math.random() * 1000000000) + path.extname(file.originalname));
      }
});

const upload = multer({
      storage: storage
});


// render edit page
router.get('/edit', ensureAuthenticated, async (req, res) => {

      try {
            const name = await User.findById(req.user._id).select({
                  name: 1
            }).exec();

            res.render('user_profile/edit', {
                  data: name
            });

      } catch (err) {
            console.log(err);
      }

});


// handle process edit
router.put('/edit', ensureAuthenticated, upload.single('picture'), async (req, res) => {

      let edit;

      const {
            name
      } = req.body;

      let errors = [];

      let userName = await User.findOne({
            name: name
      });

      if (userName != null) {
            errors.push({
                  msg: "Username is already register"
            });
      }

      // check filed name
      if (!req.body.name) {
            errors.push({
                  msg: "Please Fill All Fields"
            });
      }


      // check file type
      if (req.file != undefined) {
            const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(req.file.mimetype);
            if (imageMimeTypes == false) {
                  errors.push({
                        msg: "Image Only"
                  });
            }
      }


      if (errors.length > 0) {

            if (req.file != undefined) removePicture(`./public/uploads/user_picture/${req.file.filename}`);
            res.render('user_profile/edit', {
                  errors,
                  name
            });

      } else {

            const picture = await User.findById(req.user._id).select({
                  user_picture: 1
            }).exec();

            // old picture name
            let pictureName = picture.user_picture;

            try {
                  edit = await User.findById(req.user._id);
                  edit.name = req.body.name;

                  // if user picture is not empty, then remove old picture and use new picture
                  if (req.file != undefined) {
                        removeOldPicture(`./public/uploads/user_picture/${picture.user_picture}`);
                        edit.user_picture = req.file.filename;

                        // if user picture is empty, still using old picture
                  } else {
                        edit.user_picture = pictureName;
                  }

                  await edit.save();
                  res.redirect('/user');

            } catch (err) {
                  console.log(err);
                  return;
            }

      }

});


// remove the user picture if registration failed
function removePicture(fileName) {
      fs.unlink(fileName, (err) => {
            if (err) console.log(err);
      });
}


// if user update their profile picture, remove old picture
function removeOldPicture(fileName) {
      fs.unlink(fileName, (err) => {
            if (err) console.log(err);
      });
}


module.exports = router;