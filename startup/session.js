'use strict';


require('dotenv').config();
const session = require('express-session');


module.exports = (app) => {
   app.use(session({
      secret: process.env.SESSION,
      resave: true,
      saveUninitialized: true
   }));
}