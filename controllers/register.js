'use strict';


const bcrypt = require('bcrypt');
const User = require('../models/user');


function renderRegisterPage(req, res) {
   res.render('register/register');
}


function createNewUser(req, res) {
   const errors = [];
   const { name, email, password, confirmPassword } = req.body;

   if (!name || !email || !password || !confirmPassword) {
      errors.push({ msg: 'please fill all fields' });
   }

   if (errors.length > 0) {
      return res.render('register/register', { errors });

   } else {
      User.findOne().or([
         {
            name
         },
         {
            email
         }
      ]).then((user) => {
         if (user) {
            if (user.name === name || user.email === email) {
               if (user.name === name && user.email === email) {
                  errors.push({
                     msg: 'username is already registered'
                  }, {
                     msg: 'email is already registered'
                  });

               } else if (user.name === name) {
                  errors.push({ msg: 'username is already registered' });

               } else {
                  errors.push({ msg: 'email is already registered' });
               }
            }

            return res.render('register/register', { errors });

         } else {
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
                     .catch((err) => console.error(err));
               });
            });
         }
      }).catch((err) => console.error('Something wrong', err));
   }
}


module.exports = {
   createNewUser,
   renderRegisterPage
}