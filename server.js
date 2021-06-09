const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const passport = require('passport');
const session = require("express-session");
const flash = require('connect-flash');
const { v4: uuidv4 } = require("uuid");

const User = require('./server/model/model');


const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  app.use(flash());
  // Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./server/config/passport')(passport);


// Connect flash
//app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router.js'))
//app.use('/', require('./server/routes/index.js'));
//app.use('/users', require('./routes/users.js'));

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});