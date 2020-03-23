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

      const {
            name
      } = req.body;

      // store all errors
      let errors = [];

      // search name, value reference from req.body.name
      const names = await User.findOne({
            name
      });
      console.log(req.user);
      // check filed name
      if (!name) {
            errors.push({
                  msg: "Please fill all fields"
            });
      }

      // check username
      if (name === names.name && name !== req.user.name) {
            errors.push({
                  msg: "Username already in use"
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
                  const thisUser = await User.findByIdAndUpdate(req.user.id, {
                        name
                  }, {
                        new: true
                  });

                  await thisUser.save();
                  res.redirect('/me');

            } catch (e) {
                  console.log(e);
                  return;
            }
      }

}

// PROBLEMS :
// mengatsi bila user hanya mengupdate namanya saja, bukan gambarnya