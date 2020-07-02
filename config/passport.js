'use strict';


const bcrypt = require('bcrypt');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;


module.exports = function (passport) {
   passport.use(
      new LocalStrategy({
         usernameField: 'email'
      }, (email, password, done) => {

         // match user
         User.findOne({
            email: email
         })
            .then(users => {
               if (!users) {
                  return done(null, false, {
                     message: 'email is not registered'
                  });
               }

               // match the passport
               bcrypt.compare(password, users.password, (err, isMatch) => {
                  if (err) {
                     console.error(err);
                     return;
                  }

                  if (isMatch) {
                     return done(null, users);

                  } else {
                     return done(null, false, {
                        message: 'incorrect email or password'
                     });
                  }
               });
            })
            .catch((err) => {
               console.error(err);
               return;
            });
      })
   )

   passport.serializeUser((user, done) => {
      done(null, user.id);
   });

   passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
         done(err, user);
      });
   });
}