const express = require('express');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const app = express();




// mongodb 
require('./startup/db')();


// passport config
require('./config/passport')(passport);


// set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));


// handle session
require('./startup/session')(app);


// passport midleware
require('./startup/passport')(app);


// handle connect-flash
require('./startup/flash')(app);


// message connect-flash
require('./middleware/connect_flash')(app);


// routes
require('./startup/routes')(app);


// Listen port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}...`);
});