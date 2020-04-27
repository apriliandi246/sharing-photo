"use strict";

const bcrypt = require('bcrypt');
const User = require('../models/User');


// render registration page
module.exports.render_register_page = (req, res) => {
    res.render('register_login/register');
}


// handle create new user process
module.exports.create_new_user = (req, res) => {
    const {
        name,
        email,
        pass,
        pass2
    } = req.body;

    // errors
    let errors = [];

    // check required fields
    if (!name || !email || !pass || !pass2) {
        errors.push({
            msg: "Please fill all fields"
        });
    }


    // show the errors 
    if (errors.length > 0) {
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
                    name
                },
                {
                    email
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
                        password: pass,
                        verified: false,
                        user_picture: "default_picture.jpeg"
                    });

                    // hash the password
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(newUser.password, salt, function (err, hash) {
                            if (err) {
                                console.log(err);
                                return;
                            }

                            // set password to hash and save the new user to database.
                            newUser.password = hash;
                            newUser.save()
                                .then(() => {
                                    req.flash('success_msg', "You are now registered");
                                    res.redirect('/user/login');
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            })
            .catch(err => console.log("Something wrong", err));
    }
}