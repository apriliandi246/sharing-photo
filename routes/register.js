const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const joined = require('../public/js/date').joined;
const router = express.Router();



// handle process upload
const storage = multer.diskStorage({
      destination: './public/uploads/user_picture',
      filename: function (req, file, callback) {
            callback(null, "user-picture" + file.fieldname + '-' + Date.now() + '-' + Math.floor(Math.random() * 1246) + path.extname(file.originalname));
      }
});

const upload = multer({
      storage: storage
});



// Render page form register
router.get('/register', (req, res) => {
      res.render('register_login/register');
});


// process register
router.post('/register', upload.single('picture'), (req, res) => {

      const {
            name,
            email,
            pass,
            pass2
      } = req.body;

      let errors = [];


      // check required fields
      if (!name || !email || !pass || !pass2) {
            errors.push({
                  msg: "Please Fill All Fields"
            });
      }

      // check password match
      if (pass !== pass2) {
            errors.push({
                  msg: "Password do not Match"
            });
      }

      // check pass length
      if (pass.length < 6) {
            errors.push({
                  msg: "Password Should be at Least 6 Characters"
            });
      }

      // check file selected
      if (req.file == undefined) {
            errors.push({
                  msg: "No Picture Selected"
            });

      } else if (req.file != undefined) {
            const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(req.file.mimetype);
            if (imageMimeTypes == false) {
                  errors.push({
                        msg: "Image Only"
                  });
            }
      }


      // show the errors 
      if (errors.length > 0) {

            // if registration failed and file upload not undefined, then delete the image from folder
            if (req.file != undefined) removePicture(`./public/uploads/user_picture/${req.file.filename}`);

            res.render('register_login/register', {
                  errors,
                  name,
                  email,
                  pass,
                  pass2
            });


      } else {

            User.findOne()
                  .or([{
                              name: name

                        },
                        {
                              email: email
                        }
                  ])
                  .then(user => {
                        if (user) {
                              if (user.name === name || user.email === email) {
                                    if (user.name === name) {
                                          errors.push({
                                                msg: "Username is already registered"
                                          });
                                    } else if (user.email === email) {
                                          errors.push({
                                                msg: "Email is already registered"
                                          });
                                    }
                              }

                              // if registration failed and file upload not undefined, then delete the image from folder
                              if (req.file != undefined) removePicture(`./public/uploads/user_picture/${req.file.filename}`);

                              res.render('register_login/register', {
                                    errors,
                                    name,
                                    email,
                                    pass,
                                    pass2
                              });

                        } else {

                              const newUser = new User({
                                    name: name,
                                    email: email,
                                    join: joined,
                                    password: pass,
                                    user_picture: req.file.filename
                              });


                              // hash the password
                              bcrypt.genSalt(10, function (err, salt) {
                                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                                          if (err) console.log(err);

                                          // set password to hash and save the new user to database.
                                          newUser.password = hash;
                                          newUser.save()
                                                .then(() => {
                                                      req.flash('success_msg', "You Are Now Registered and Can Log in");
                                                      res.redirect('/user/login');
                                                })
                                                .catch(err => console.log(err));
                                    });
                              });
                        }
                  })
                  .catch(err => console.log("Something wrong", err));
      }
});



// remove the user picture if registration failed
function removePicture(fileName) {
      fs.unlink(fileName, (err) => {
            if (err) console.log(err);
      });
}


module.exports = router;