"use strict";

const User = require('../models/User');
const {
      removeImage,
      removeOldPicture
} = require('../upload/upload');


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

      // check filed name
      if (!name) {
            errors.push({
                  msg: "Please fill all fields"
            });
      }

      // check file type
      if (req.file !== undefined) {
            const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(req.file.mimetype);

            if (imageMimeTypes === false) {
                  errors.push({
                        msg: "Image only"
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

// Problems :
// check name already use or not