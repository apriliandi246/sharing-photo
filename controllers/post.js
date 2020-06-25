'use strict';


const path = require('path');
const multer = require('multer');
const Post = require('../models/post');
const crypto = require('crypto').randomBytes(16).toString('hex');


// show make post page
function renderPostPage(req, res) {
   res.render('post/post');
}


// handle process post
async function post(req, res) {
   const {
      description,
      picture
   } = req.body;

   let errors = [];

   if (!description || req.file == undefined) {
      errors.push({
         msg: 'please fill all fields'
      });
   }

   // check type the file
   if (req.file != undefined) {
      const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(req.file.mimetype);

      if (imageMimeTypes == false) {
         errors.push({
            msg: 'image only'
         });
      }
   }


   // if have an errors
   if (errors.length > 0) {
      // if post process is failed, remove the image
      if (req.file !== undefined) removeImage(`./public/uploads/img-post/${req.file.filename}`);

      res.render('post/post', {
         errors,
         picture,
         description
      });

   } else {
      // if errors is nothing
      try {
         // make new post
         const newPost = new Post({
            user_id: req.user._id,
            picture: req.file.filename,
            description: req.body.description.trimStart().trimEnd(),
         });

         // save to database and redirect to home pag
         await newPost.save();
         res.redirect('/');

      } catch (err) {
         console.log('Something wrong', err);
         return;
      }
   }
}


// handle upload post
const storage = multer.diskStorage({
   destination: './public/uploads/img-post',
   filename: function (req, file, callback) {
      callback(null, Date.now() + crypto + path.extname(file.originalname));
   }
});


// remove image post, if post process is failed
const removeImage = (fileName) => {
   fs.unlink(fileName, (err) => {
      if (err) console.log(err);
   })
}


module.exports = {
   post,
   renderPostPage,
   upload: multer({
      storage
   })
}