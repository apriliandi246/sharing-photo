'use strict';


const moment = require('moment');
const Post = require('../models/post');


module.exports.getAllPosts = async (req, res) => {
   try {
      const posts = await Post.find().sort({
         createdAt: 'desc'
      }).populate('user_id').exec();

      res.render('index', {
         posts,
         relativeDate,
      });

   } catch (err) {
      console.error('Something wrong', err);
      return;
   }
}


function relativeDate(date) {
   return moment(date).fromNow();
}