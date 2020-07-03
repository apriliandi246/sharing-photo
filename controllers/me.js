'use strict';


const Post = require('../models/post');
const Time = require('../helper/time');


module.exports.renderMyProfile = async (req, res) => {
   try {
      const posts = await Post.find({
         user_id: req.user._id
      }).sort({
         createdAt: 'desc'
      });

      res.render('user/me', {
         posts,
         formatDate,
         userData: req.user
      });

   } catch (err) {
      console.error('Something wrong', err);
      return;
   }
}


function formatDate(date) {
   const format = new Time(date).format('medium');
   return format;
}