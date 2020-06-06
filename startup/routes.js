"use strict";


const express = require('express');


// handle all routes and others
module.exports = (app) => {
   // body-parser
   app.use(express.urlencoded({
      extended: false
   }));

   app.disable('etag');
   app.disable('x-powered-by');

   // Routes
   app.use('/user', require('../routes/register'));
   app.use('/user', require('../routes/login'));
   app.use('/', require('../routes/index'));
   app.use('/user', require('../routes/logout'));
   app.use('/me', require('../routes/user_profile'));
   app.use('/user', require('../routes/edit_profile'));
   app.use('/user', require('../routes/another_user'));
   app.use('/post', require('../routes/post'));
   app.use('/search', require('../routes/search'));
   app.use('/logout', require('../routes/logout'));

   // Handle page not found
   app.use((req, res, next) => {
      res.redirect('/');
   });
}