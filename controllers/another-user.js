'use strict';


const User = require('../models/user');
const Post = require('../models/post');
const Time = require('../helper/time');


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


function formatDate(date) {
   let time = new Time(date);
   return time.format('medium');
}