const Post = require('../models/Post');
const date = require('../public/js/date').joined;
const {
      removeImage
} = require('../upload/upload');



const render_make_post_page = (req, res) => {
      res.render('posts/post');
}


const make_post = async (req, res) => {

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


            // if nothing errors
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

}


module.exports = {
      render_make_post_page,
      make_post
}