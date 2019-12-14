const session = require('express-session');
require('dotenv').config();

module.exports = function (app) {
      app.use(session({
            secret: process.env.SESSION,
            resave: true,
            saveUninitialized: true
      }));
}