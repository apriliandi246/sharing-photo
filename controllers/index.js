const Post = require('../models/Post');

const get_all_post = async (req, res) => {

      try {
            // populate('user_id') => untuk mengambil data dari schema user.
            const posts = await Post.find().sort({
                  picture: 'desc'
            }).populate('user_id').exec();

            res.render('index', {
                  posts: posts
            });

      } catch (err) {
            console.log("Something wrong", err);
            return;
      }

}


module.exports = {
      get_all_post
}