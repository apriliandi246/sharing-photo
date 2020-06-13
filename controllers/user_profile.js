"use strict";

const Post = require('../models/Post');
const moment = require('moment');


module.exports.render_user_profile_page = async (req, res) => {
   try {
      // all posts of user
      const posts = await Post.find({
         user_id: req.user._id
      }).sort({
         createdAt: 'desc'
      });

      res.render('user/user', {
         posts,
         formatDate,
         img: req.user.user_picture,
         name: req.user.name,
         join: moment(req.user.join).format('ll')
      });

   } catch {
      posts = [];
   }
}


// make format date
function formatDate(date) {
   return moment(date).format('ll');
}