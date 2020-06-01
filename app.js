//////\\//\\//\\//	::EXCESSIVE::	\\/\/\/\/\/\\\///\\/\/// 

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require("path") ;
const bodyParser = require("body-parser") ;
const LocalStrategy = require('passport-local').Strategy;

const  User = require("./models/User") ;
const app = express();


require('./config/passport')(passport);

// DB Connection
// const db = require('./config/keys').mongoURI;
const db = "mongodb://localhost:27017/fabra" 

mongoose.connect(db,{ useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log("Error Whiles Connecting To Database: " , err));


app.use(expressLayouts);
// app.use(bodyParser.json()) ;
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(express.static(path.join(__dirname + "/public"))) ;

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);



// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash ::: MIGHT BE USED
app.use(flash());


app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next() ;
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


app.use(passport.initialize());
app.use(passport.session());



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
