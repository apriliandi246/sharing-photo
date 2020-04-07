"use strict";

const User = require('../models/User');
const Post = require('../models/Post');
const moment = require('moment');


// handle when user visit another user
module.exports.visit_another_user = async (req, res) => {
      try {
            const name = await User.find({
                  name: req.params.name
            }).exec();

            // jika namanya sama degan nama user yang sedang login, maka redirect saja ke halaman profile
            if (req.user.name === req.params.name) {
                  res.redirect('/me');

            } else if (req.user.name !== req.params.name && name.length > 0) {
                  // user lain
                  // take id user id
                  const post = await Post.find({
                        user_id: name[0]._id
                  }).exec();

                  function formatDate(join) {
                        return moment(join).format('ll');
                  }

                  res.render('user_profile/another_user', {
                        formatDate,
                        data: name,
                        posts: post
                  });

            } else {
                  // jika user tidak ditemukan
                  res.redirect('/');
            }

      } catch (err) {
            console.log("Something wrong", err);
            return;
      }
}