'use strict';


const Post = require('../models/post');
const Time = require('../helper/time');


module.exports.renderMyProfile = async (req, res) => {
   try {
      const userData = req.user;
      const posts = await Post.find({
         user_id: userData._id
      }).sort({
         createdAt: 'desc'
      });

      res.render('user/me', {
         posts,
         userData,
         formatDate
      });

   } catch (err) {
      console.error('Something wrong', err);
      return;
   }
}


function formatDate(date) {
   const time = new Time(date);
   return time.format('medium');
}