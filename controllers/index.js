'use strict';


const Post = require('../models/post');
const Time = require('../helper/time');


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
   let time = new Time(date);
   return time.fromNow()
}