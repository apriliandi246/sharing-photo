const {
      ensureAuthenticated
} = require('../config/auth');
const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const router = express.Router();



router.get('/:name', ensureAuthenticated, async (req, res) => {

      try {

            const name = await User.find({
                  name: req.params.name
            }).exec();

            if (req.user.name === req.params.name) {
                  res.redirect('/user');

            } else if (name.length === 0) {
                  res.status(404).render('not_found/user_not_found', {
                        name: req.params.name
                  });

            } else {
                  // take id user id
                  const post = await Post.find({
                        user_id: name[0]._id
                  }).exec();

                  res.render('user_profile/users', {
                        data: name,
                        posts: post
                  });
            }

      } catch (err) {
            console.log("Something wrong", err);
      }

});


module.exports = router;