"use strict";


const passport = require('passport');


// render login page
function renderLoginPage(req, res) {
   res.render('login/login');
}


// handle login process
async function login(req, res, next) {
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
         return res.render('login/login', {
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


module.exports = {
   login,
   renderLoginPage
}