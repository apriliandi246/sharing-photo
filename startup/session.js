"use strict";

const session = require('express-session');
require('dotenv').config();


// handle session
module.exports = (app) => {
   app.use(session({
      secret: process.env.SESSION,
      resave: true,
      saveUninitialized: true
   }));
}