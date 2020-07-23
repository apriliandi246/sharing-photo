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
   const fileIput = req.file;
   const userData = req.user;
   const description = req.body.description;
   const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

   if (!description || !fileIput) {
      errors.push({ msg: 'please fill all fields' });
   }

   if (fileIput && !imageMimeTypes.includes(fileIput.mimetype)) {
      errors.push({ msg: 'image only' });
   }

   if (errors.length > 0) {
      if (fileIput) {
         removeImage(`./public/uploads/img-post/${fileIput.filename}`);
      }

      res.render('post/post', {
         errors
      });

   } else {
      try {
         const newPost = new Post({
            user_id: userData._id,
            image: fileIput.filename,
            description: description.trimStart().trimEnd(),
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