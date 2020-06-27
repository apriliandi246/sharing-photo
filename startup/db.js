'use strict';


require('dotenv').config();
const mongoose = require('mongoose');


module.exports = () => {
   mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
   })
      .then(() => console.log(`Connect to MongoDB...`))
      .catch(err => console.log("Something wrong", err));
}