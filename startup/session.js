const session = require('express-session');

module.exports = function (app) {
      app.use(session({
            secret: 'just meme',
            resave: true,
            saveUninitialized: true
      }));
}