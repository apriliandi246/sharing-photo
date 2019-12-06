const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto').randomBytes(24).toString('hex');



// handle process upload for POST
const storage = multer.diskStorage({
      destination: './public/uploads/img_post',
      filename: function (req, file, callback) {
            callback(null, crypto + "-" + Date.now() + path.extname(file.originalname));
      }
});

// for upload POST
const upload = multer({
      storage: storage
});



// handle process upload for USER PICTURE
const storage2 = multer.diskStorage({
      destination: './public/uploads/user_picture',
      filename: function (req, file, callback) {
            callback(null, crypto + "-" + Date.now() + path.extname(file.originalname));
      }
});

// for upload USER PICTURE
const upload2 = multer({
      storage: storage2
});



// remove image post, if post process is failed
function removeImage(fileName) {
      fs.unlink(fileName, (err) => {
            if (err) console.log(err);
      })
}


// if user update their profile picture, remove old picture
function removeOldPicture(fileName) {
      fs.unlink(fileName, (err) => {
            if (err) console.log(err);
      });
}



module.exports = {
      upload: upload,
      upload2: upload2,
      removeImage: removeImage,
      removeOldImage: removeOldPicture
}