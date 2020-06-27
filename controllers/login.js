'use strict';


const passport = require('passport');


function renderLoginPage(req, res) {
   res.render('login/login');
}


async function login(req, res, next) {
   try {
      const errors = [];
      const { email, password } = req.body;

      if (!email || !password) {
         errors.push({ msg: 'please fill all fields' });
      }

      if (errors.length > 0) {
         return res.render('login/login', {
            errors
         });

      } else {
         passport.authenticate('local', {
            failureFlash: true,
            successRedirect: '/',
            failureRedirect: '/user/login'
         })(req, res, next);
      }

   } catch (err) {
      console.error('Something wrong', err);
      return;
   }
}


module.exports = {
   login,
   renderLoginPage
}