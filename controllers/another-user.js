'use strict';


const moment = require('moment');
const User = require('../models/user');
const Post = require('../models/post');


module.exports.renderUserProfile = async (req, res) => {
   try {
      const user = await User.find({
         name: req.params.name
      }).exec();

      if (req.params.name === req.user.name) {
         res.redirect('/me');

      } else if (user.length > 0) {
         const posts = await Post.find({
            user_id: user[0]._id
         }).sort({
            createdAt: 'desc'
         }).exec();

         res.render('user/another-user', {
            posts,
            formatDate,
            user: user[0]
         });

      } else {
         res.redirect('/');
      }

   } catch (err) {
      console.error('Something wrong', err);
      return;
   }
}


function formatDate(join) {
   return moment(join).format('ll');
}