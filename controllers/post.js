'use strict';


const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Post = require('../models/post');
const crypto = require('crypto').randomBytes(16).toString('hex');


function renderPostPage(req, res) {
   res.render('post/post');
}


async function post(req, res) {
   const errors = [];
   const description = req.body;
   const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

   if (!description || req.file === undefined) {
      errors.push({ msg: 'please fill all fields' });
   }

   if (req.file !== undefined && !imageMimeTypes.includes(req.file.mimetype)) {
      errors.push({ msg: 'image only' });
   }

   if (errors.length > 0) {
      if (req.file !== undefined) {
         removeImage(`./public/uploads/img-post/${req.file.filename}`);
      }

      res.render('post/post', {
         errors
      });

   } else {
      try {
         const newPost = new Post({
            user_id: req.user._id,
            image: req.file.filename,
            description: req.body.description.trimStart().trimEnd(),
         });

         await newPost.save();
         res.redirect('/');

      } catch (err) {
         console.error('Something wrong', err);
         return;
      }
   }
}


const storage = multer.diskStorage({
   destination: './public/uploads/img-post',
   filename: (req, file, callback) => {
      callback(null, Date.now() + crypto + path.extname(file.originalname));
   }
});

const upload = multer({
   storage
}).single('image');

const removeImage = (fileName) => {
   fs.unlink(fileName, (err) => {
      if (err) {
         console.error(err);
      }
   });
}


module.exports = {
   post,
   upload,
   renderPostPage
}