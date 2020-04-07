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

            // make relative date using moment js (https://momentjs.com/docs/#/displaying/fromnow/)
            function relativeDate(date) {
                  return moment(date).fromNow();
            }

            res.render('index', {
                  posts,
                  relativeDate
            });

      } catch (err) {
            console.log("Something wrong", err);
            return;
      }
}