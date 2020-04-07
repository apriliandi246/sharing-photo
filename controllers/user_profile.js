"use strict";

const Post = require('../models/Post');
const moment = require('moment');


module.exports.render_user_profile_page = async (req, res) => {
      try {
            // all posts user
            const posts = await Post.find({
                  user_id: req.user._id
            });

            function formatDate(date) {
                  return moment(date).format('ll');
            }

            res.render('user_profile/user', {
                  posts,
                  formatDate,
                  img: req.user.user_picture,
                  name: req.user.name,
                  join: moment(req.user.join).format('ll'),
                  verified: req.user.verified
            });

      } catch {
            posts = [];
      }
}