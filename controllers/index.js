"use strict";

const Post = require('../models/Post');
const moment = require('moment');


// render the main page
module.exports.get_all_post = async (req, res) => {
      try {
            // populate('user_id') => untuk mengambil data dari schema user.
            const posts = await Post.find().sort({
                  picture: 'desc'
            }).populate('user_id').exec();

            const datePost = moment(posts[0].fullDate[0]).fromNow();

            res.render('index', {
                  posts: posts,
                  date: datePost
            });

      } catch (err) {
            console.log("Something wrong", err);
            return;
      }
}