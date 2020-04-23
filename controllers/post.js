"use strict";

const Post = require('../models/Post');
const {
      removeImage
} = require('../upload/upload');



// show make post page
module.exports.render_make_post_page = (req, res) => {
      res.render('posts/post');
}


// handle process post
module.exports.make_post = async (req, res) => {
      const {
            description,
            picture
      } = req.body;

      let errors = [];

      if (!description || req.file == undefined) {
            errors.push({
                  msg: "Please fill all fields"
            });
      }

      // check type the file
      if (req.file != undefined) {
            const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(req.file.mimetype);

            if (imageMimeTypes == false) {
                  errors.push({
                        msg: "Image only"
                  });
            }
      }

      // if have an errors
      if (errors.length > 0) {
            // if post process is failed, remove the image
            if (req.file != undefined) removeImage(`./public/uploads/img_post/${req.file.filename}`);

            res.render('posts/post', {
                  errors,
                  description,
                  picture
            });

      } else {
            // if errors is nothing
            try {
                  // make new post
                  const newPost = new Post({
                        picture: req.file.filename,
                        description: req.body.description,
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
}