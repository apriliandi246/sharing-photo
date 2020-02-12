"use strict";

const Post = require('../models/Post');
const moment = require('moment');


// render the main page
module.exports.get_all_post = async (req, res) => {
      try {
            // populate('user_id') => untuk mengambil data dari schema user.
            const posts = await Post.find().sort({
                  picture: 'desc'
            }).populate('user_id').exec();

            // MEMBUAT WAKTU POSTINGANNYA DINAMIS SESUAI DENGAN POSTINGANNYA

            res.render('index', {
                  posts
            });

      } catch (err) {
            console.log("Something wrong", err);
            return;
      }
}