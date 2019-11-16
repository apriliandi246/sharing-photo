const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const app = express();



// passport config
require('./config/passport')(passport);



// Handle database
mongoose.connect('mongodb://localhost/meme', {
            useNewUrlParser: true,
            useUnifiedTopology: true
      })
      .then(() => console.log("Connect to MongoDB..."))
      .catch(err => console.log("Something wrong", err));



// set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));


app.disable('etag');
app.disable('x-powered-by');


// set up method put
app.use(methodOverride('_method'));



// body-parser
app.use(express.urlencoded({
      extended: false
}));



// handle session
app.use(session({
      secret: 'just meme',
      resave: true,
      saveUninitialized: true
}));



// passport midleware
app.use(passport.initialize());
app.use(passport.session());



// handle connect-flash
app.use(flash());



// message connect-flash
app.use((req, res, next) => {
      res.locals.success_msg = req.flash("success_msg");
      res.locals.error_msg = req.flash("error_msg");
      res.locals.error = req.flash("error");
      next();
});



// Routes
app.use('/user', require('./routes/register'));
app.use('/user', require('./routes/login'));
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/logout'));
app.use('/user', require('./routes/user_profile'));
app.use('/user', require('./routes/edit_profile'));
app.use('/user', require('./routes/another_user'));
app.use('/post', require('./routes/post'));


// Handle page not found
app.use((req, res, next) => {
      res.status(404).render('not_found/page_not_found');
});


// Listen port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}...`);
});