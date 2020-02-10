"use strict";

const mongoose = require('mongoose');
const config = require('config');

// handle connect to database
module.exports = function () {
      const db = config.get('db');
      mongoose.connect('db', {
                  useNewUrlParser: true,
                  useUnifiedTopology: true
            })
            .then(() => console.log(`Connect to ${db}...`))
            .catch(err => console.log("Something wrong", err));
}