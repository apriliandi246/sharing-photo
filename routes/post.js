const {
      ensureAuthenticated
} = require('../config/auth');
const {
      upload,
      removeImage
} = require('../upload/upload');
const express = require('express');
const Post = require('../models/Post');
const date = require('../public/js/date').joined;
const router = express.Router();



// render page post
router.get('/', ensureAuthenticated, (req, res) => {
      res.render('posts/post');
});


// handle process post
router.post('/', ensureAuthenticated, upload.single('picture'), async (req, res) => {

      const {
            description,
            picture
      } = req.body;


      let errors = [];


      if (!description || req.file == undefined) {
            errors.push({
                  msg: "Please Fill All Fields"
            });
      }

      // check type the file
      if (req.file != undefined) {
            const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(req.file.mimetype);
            if (imageMimeTypes == false) {
                  errors.push({
                        msg: "Image Only"
                  });
            }
      }


      // jika terdapat error
      if (errors.length > 0) {

            // if post process is failed, remove the image
            if (req.file != undefined) removeImage(`./public/uploads/img_post/${req.file.filename}`);

            res.render('posts/post', {
                  errors,
                  description,
                  picture
            });


            // jika tidak ada error
      } else {

            try {

                  // make new post
                  const newPost = new Post({
                        picture: req.file.filename,
                        description: req.body.description,
                        date: date,
                        user_id: req.user._id
                  });

                  // save to database and redirect to home pag
                  await newPost.save();
                  res.redirect('/');

            } catch (err) {
                  console.log("Something wrong", err);
                  return;
            }

      }

});


module.exports = router;