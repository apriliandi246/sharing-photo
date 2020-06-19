"use strict";

const moment = require('moment');
const User = require('../models/user');
const Post = require('../models/post');


// handle when user visit another user
module.exports.visit_another_user = async (req, res) => {
   try {
      const name = await User.find({
         name: req.params.name
      }).exec();

      if (req.user.name === req.params.name) {
         res.redirect('/me');

      } else if (req.user.name !== req.params.name && name.length > 0) {
         const posts = await Post.find({
            user_id: name[0]._id
         }).sort({
            createdAt: 'desc'
         }).exec();

         res.render('user/another-user', {
            posts,
            formatDate,
            data: name,
         });

      } else {
         res.redirect('/');
      }

   } catch (err) {
      console.log("Something wrong", err);
      return;
   }
}


function formatDate(join) {
   return moment(join).format('ll');
}