"use strict";

const passport = require('passport');


// render login page
module.exports.render_login_page = (req, res) => {
   res.render('register_login/login', {
      nav: "Login"
   });
}

// handle login process
module.exports.login = async (req, res, next) => {
   try {
      const {
         email,
         password
      } = req.body;

      let errors = [];

      if (!email || !password) {
         errors.push({
            msg: "please fill all fields"
         });
      }

      if (errors.length > 0) {
         return res.render('register_login/login', {
            errors,
            email,
            password
         });

      } else {
         passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/user/login',
            failureFlash: true
         })(req, res, next);
      }

   } catch (err) {
      console.log("Something wrong", err);
      return;
   }
}