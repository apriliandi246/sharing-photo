"use strict";

const moment = require('moment');
const Post = require('../models/post');


module.exports.renderMyProfile = async (req, res) => {
   try {
      // all posts of user
      const posts = await Post.find({
         user_id: req.user._id
      }).sort({
         createdAt: 'desc'
      });

      res.render('user/me', {
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