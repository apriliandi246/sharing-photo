const {
      ensureAuthenticated
} = require('../config/auth');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');
const date = require('../public/js/date').joined;
const router = express.Router();



// handle process upload
const storage = multer.diskStorage({
      destination: './public/uploads/img_post',
      filename: function (req, file, callback) {
            callback(null, "image-post-" + file.fieldname + '-' + Date.now() + '-' + Math.floor(Math.random() * 1246) + path.extname(file.originalname));
      }
});

const upload = multer({
      storage: storage
});



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


      // if pass
      if (errors.length > 0) {

            // if post process is failed, remove the image
            if (req.file != undefined) removeImage(`./public/uploads/img_post/${req.file.filename}`);

            res.render('posts/post', {
                  errors,
                  description,
                  picture
            });

      } else {

            const newPost = new Post({
                  picture: req.file.filename,
                  description: req.body.description,
                  date: date,
                  user_id: req.user._id
            });

            try {
                  // save to database and redirect to home page
                  await newPost.save();
                  res.redirect('/');

            } catch (err) {
                  console.log(err);
            }

      }

});


// remove image post, if post process is failed
function removeImage(fileName) {
      fs.unlink(fileName, (err) => {
            if (err) console.log(err);
      })
}


module.exports = router;