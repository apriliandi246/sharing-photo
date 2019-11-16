const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
      picture: {
            type: String,
            required: true
      },
      description: {
            type: String,
            require: true
      },
      date: {
            type: String,
            required: true
      },
      user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
      }
});


module.exports = mongoose.model('Post', PostSchema);