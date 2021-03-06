const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
   image: {
      type: String,
      required: true
   },
   description: {
      type: String,
      require: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   }
});

module.exports = mongoose.model('Post', PostSchema);