const {
      ensureAuthenticated
} = require('../config/auth');
const express = require('express');
const Post = require('../models/Post');
const router = express.Router();


router.get('/', ensureAuthenticated, async (req, res) => {

      let posts;

      try {
            // populate('user_id') => untuk mengambil data dari schema user.
            posts = await Post.find().sort({
                  picture: 'desc'
            }).populate('user_id').exec();

      } catch {
            posts = [];
      }

      res.render('index', {
            posts: posts
      });

});


module.exports = router;