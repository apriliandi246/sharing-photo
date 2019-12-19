const express = require('express');
const User = require('../models/User');
const {
      ensureAuthenticated
} = require('../config/auth');
const {
      upload2,
      removeImage,
      removeOldImage
} = require('../upload/upload');
const router = express.Router();



// render edit page
router.get('/edit', ensureAuthenticated, async (req, res) => {

      User.findById(req.user._id, (err, userInfo) => {
            res.render("user_profile/edit_profile", {
                  data: userInfo
            });
      })

});


// handle process edit
router.post('/edit', ensureAuthenticated, upload2.single('picture'), async (req, res) => {

      let edit;

      const {
            name
      } = req.body;

      let errors = [];

      let userName = await User.findOne({
            name: name
      });


      // check filed name
      if (!req.body.name) {
            errors.push({
                  msg: "Please Fill All Fields"
            });
      }


      if (userName != null) {
            errors.push({
                  msg: "Username is already register"
            });
      }


      // check file type
      if (req.file != undefined) {
            const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(req.file.mimetype);
            if (imageMimeTypes === false) {
                  errors.push({
                        msg: "Image Only"
                  });
            }
      }


      if (errors.length > 0) {

            if (req.file != undefined) removeImage(`./public/uploads/user_picture/${req.file.filename}`);
            res.render('user_profile/edit_profile', {
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
                  edit.name = name;

                  // if user picture is not empty, then remove old picture and use new picture
                  if (req.file != undefined) {
                        removeOldImage(`./public/uploads/user_picture/${picture.user_picture}`);
                        edit.user_picture = req.file.filename;


                  } else {
                        // if user picture is empty, still using old picture
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


module.exports = router;