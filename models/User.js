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
      sumVisit: {
            type: Number
      }
});

module.exports = mongoose.model('User', UserSchema);