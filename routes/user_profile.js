const {
      ensureAuthenticated
} = require('../config/auth');
const express = require('express');
const Post = require('../models/Post');
const router = express.Router();



// render user profile
router.get('/', ensureAuthenticated, async (req, res) => {

      try {
            const posts = await Post.find({
                  user_id: req.user._id
            });

            res.render('user_profile/user', {
                  img: req.user.user_picture,
                  name: req.user.name,
                  join: req.user.join,
                  posts: posts
            });

      } catch {
            posts = [];
      }

});

module.exports = router;