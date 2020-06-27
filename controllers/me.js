'use strict';


const moment = require('moment');
const Post = require('../models/post');


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
         name: req.user.name,
         join: req.user.join,
         img: req.user.user_picture
      });

   } catch (err) {
      console.error('Something wrong', err);
      return;
   }
}


function formatDate(date) {
   return moment(date).format('ll');
}