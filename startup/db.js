"use strict";

const mongoose = require('mongoose');


// handle connect to database
module.exports = function () {
   mongoose.connect("mongodb://localhost/project_1", {
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
      .then(() => console.log(`Connect to MongoDB...`))
      .catch(err => console.log("Something wrong", err));
}