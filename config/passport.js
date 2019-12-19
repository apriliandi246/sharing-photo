const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');


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
                                          message: "That Email is not Registered"
                                    });
                              }

                              // match the passport to login
                              bcrypt.compare(password, users.password, (err, isMatch) => {
                                    if (err) throw err;

                                    if (isMatch) {
                                          return done(null, users);
                                    } else {
                                          return done(null, false, {
                                                message: "Password Incorect"
                                          });
                                    }
                              });
                        })
                        .catch(err => console.log(err));
            })
      )

      passport.serializeUser(function (user, done) {
            done(null, user.id);
      });

      passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                  done(err, user);
            });
      });

}