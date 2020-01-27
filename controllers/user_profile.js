"use strict";

const Post = require('../models/Post');


module.exports.render_user_profile_page = async (req, res) => {
      try {
            const posts = await Post.find({
                  user_id: req.user._id
            });

            res.render('user_profile/user', {
                  img: req.user.user_picture,
                  name: req.user.name,
                  join: req.user.join,
                  posts: posts
            });

      } catch {
            posts = [];
      }
}