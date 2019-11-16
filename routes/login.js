const express = require('express');
const passport = require('passport');
const router = express.Router();


// render login page
router.get('/login', (req, res) => {
      res.render('register_login/login');
});


// handling process login
router.post('/login', (req, res, next) => {

      const {
            email,
            password
      } = req.body;

      let errors = [];

      if (!email || !password) {
            errors.push({
                  msg: "Please Fill All Fields"
            });
      }

      if (errors.length > 0) {
            return res.render('register_login/login', {
                  errors,
                  email,
                  password
            });
      }

      passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/user/login',
            failureFlash: true
      })(req, res, next);

});


module.exports = router;