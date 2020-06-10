"use strict";

const Post = require('../models/Post');
const moment = require('moment');


// render the main page
module.exports.get_all_post = async (req, res) => {
   try {
      // populate('user_id') => untuk mengambil data dari schema user.
      const posts = await Post.find().sort({
         createdAt: 'desc'
      }).populate('user_id').exec();

      res.render('index', {
         posts,
         relativeDate,
      });

   } catch (err) {
      console.log("Something wrong", err.message);
      return;
   }
}


// make relative date 
function relativeDate(date) {
   return moment(date).fromNow();
}