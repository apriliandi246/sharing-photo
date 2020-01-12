const express = require('express');


// handle all routes and others
module.exports = function (app) {

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


      // Handle page not found
      app.use((req, res, next) => {
            res.status(404).render('not_found/page_not_found');
      });

}