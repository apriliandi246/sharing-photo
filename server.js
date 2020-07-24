'use strict';


const express = require('express');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const app = express();


require('./startup/db')();


require('./config/passport')(passport);


app.disable('etag');
app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


require('./startup/session')(app);


require('./startup/passport')(app);


require('./startup/flash')(app);


require('./middleware/connect-flash')(app);


require('./startup/routes')(app);

app.listen(8000, () => {
   console.log('Server started on port 8000...');
});