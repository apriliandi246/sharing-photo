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
            type: Date,
            default: Date.now
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
            type: Boolean
      }
});

module.exports = mongoose.model('User', UserSchema);