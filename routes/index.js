const {
      ensureAuthenticated
} = require('../config/auth');
const express = require('express');
const Post = require('../models/Post');
const router = express.Router();


router.get('/', ensureAuthenticated, async (req, res) => {

      try {
            // populate('user_id') => untuk mengambil data dari schema user.
            const posts = await Post.find().sort({
                  picture: 'desc'
            }).populate('user_id').exec();

            res.render('index', {
                  posts: posts
            });

      } catch (err) {
            console.log("Something wrong", err);
      }

});


module.exports = router;