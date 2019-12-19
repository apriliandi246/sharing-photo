const express = require('express');
const passport = require('passport');
const {
      forwardAuth
} = require('../config/auth');
const router = express.Router();



// render login page
router.get('/login', forwardAuth, (req, res) => {
      res.render('register_login/login');
});


// handling process login
router.post('/login', forwardAuth, async (req, res, next) => {

      try {
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

});

module.exports = router;