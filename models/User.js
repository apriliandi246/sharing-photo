const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true
      },
      join: {
            type: String,
            required: true
      },
      password: {
            type: String,
            required: true
      },
      user_picture: {
            type: String,
            required: true
      },
      verified: {
            type: Boolean,
            default: false
      }
});

module.exports = mongoose.model('User', UserSchema);