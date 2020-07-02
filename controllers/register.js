'use strict';


const bcrypt = require('bcrypt');
const User = require('../models/user');


function renderRegisterPage(req, res) {
   res.render('register/register');
}


async function createNewUser(req, res) {
   const errors = [];
   const { name, email, password, confirmPassword } = req.body;

   if (!name || !email || !password || !confirmPassword) {
      errors.push({ msg: 'please fill all fields' });
   }

   if (errors.length > 0) {
      return res.render('register/register', {
         errors
      });

   } else {
      const dataFromName = await User.find({ name });
      const dataFromEmail = await User.find({ email });

      if (dataFromName.length > 0 || dataFromEmail.length > 0) {
         if (dataFromName.length > 0 && dataFromEmail.length > 0) {
            errors.push({
               msg: 'username is already registered'
            }, {
               msg: 'email is already registered'
            });

         } else if (dataFromName.length > 0) {
            errors.push({ msg: 'username is already registered' });

         } else {
            errors.push({ msg: 'email is already registered' });
         }

         return res.render('register/register', {
            errors
         });
      }

      const newUser = new User({
         name,
         email,
         password,
         user_picture: 'default-picture.jpeg'
      });

      bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
               console.error(err);
               return;
            }

            newUser.password = hash;

            newUser.save()
               .then(() => {
                  req.flash('success_msg', 'You are now registered');
                  res.redirect('/user/login');
               })
               .catch((err) => {
                  console.error(err);
                  return;
               });
         });
      });
   }
}


module.exports = {
   createNewUser,
   renderRegisterPage
}