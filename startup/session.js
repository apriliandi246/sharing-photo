const session = require('express-session');
const mongoose = require('mongoose');


module.exports = function (app) {
      app.use(session({
            secret: process.env.SESSION,
            resave: true,
            saveUninitialized: true,
            store: new(require('express-sessions'))({
                  storage: 'mongodb',
                  instance: mongoose,
                  host: 'localhost',
                  port: 8000,
                  db: 'project_1',
                  collection: 'session'
            })
      }));
}