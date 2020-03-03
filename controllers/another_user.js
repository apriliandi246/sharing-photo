"use strict";

const User = require('../models/User');
const Post = require('../models/Post');


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

                  res.render('user_profile/another_user', {
                        data: name,
                        posts: post
                  });

            } else {
                  // jika user tidak ditemukan
                  res.status(404).render('not_found/user_not_found', {
                        name: req.params.name
                  });
            }

      } catch (err) {
            console.log("Something wrong", err);
            return;
      }
}