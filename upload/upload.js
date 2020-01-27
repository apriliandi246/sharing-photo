"use strict";

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto').randomBytes(16).toString('hex');


// *** Hanlde all Process Upload Image ***


// Handle Process Upload for POST

const storage = multer.diskStorage({
      destination: './public/uploads/img_post',
      filename: function (req, file, callback) {
            callback(null, Date.now() + crypto + path.extname(file.originalname));
      }
});


// for upload POST
module.exports.upload = multer({
      storage: storage
});



// Handle Process Upload for USER PICTURE

const storage2 = multer.diskStorage({
      destination: './public/uploads/user_picture',
      filename: function (req, file, callback) {
            callback(null, crypto + "-" + Date.now() + path.extname(file.originalname));
      }
});


// for upload USER PICTURE
module.exports.upload2 = multer({
      storage: storage2
});


// remove image post, if post process is failed
module.exports.removeImage = (fileName) => {
      fs.unlink(fileName, (err) => {
            if (err) console.log(err);
      })
}


// if user update their profile picture, remove old picture
module.exports.removeOldPicture = (fileName) => {
      fs.unlink(fileName, (err) => {
            if (err) console.log(err);
      });
}