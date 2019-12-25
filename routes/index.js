const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const {
      ensureAuthenticated
} = require('../config/auth');
const router = express.Router();


router.get('/', ensureAuthenticated, async (req, res) => {

      try {
            // populate('user_id') => untuk mengambil data dari schema user.
            const posts = await Post.find().sort({
                  picture: 'desc'
            }).populate('user_id').exec();

            console.log(posts);

            if (req.session.passport.user == req.user._id) {
                  let user = await User.findById(req.user._id);

                  if (user.sumVisit == undefined) {
                        user.sumVisit = 1;
                  } else {
                        user.sumVisit = user.sumVisit + 1;
                  }

                  await user.save();
            }

            res.render('index', {
                  posts: posts
            });

      } catch (err) {
            console.log("Something wrong", err);
            return;
      }

});


module.exports = router;