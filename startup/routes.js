'use strict';


const express = require('express');


module.exports = (app) => {
   app.use(express.urlencoded({
      extended: false
   }));

   app.disable('etag');
   app.disable('x-powered-by');

   // Routes
   app.use('/me', require('../routes/me'));
   app.use('/', require('../routes/index'));
   app.use('/post', require('../routes/post'));
   app.use('/user', require('../routes/login'));
   app.use('/user', require('../routes/logout'));
   app.use('/search', require('../routes/search'));
   app.use('/logout', require('../routes/logout'));
   app.use('/user', require('../routes/register'));
   app.use('/user', require('../routes/edit-profile'));
   app.use('/user', require('../routes/another-user'));

   // Handle page not found
   app.use((req, res, next) => {
      res.redirect('/');
   });
}