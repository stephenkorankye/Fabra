//////\\//\\//\\//	::EXCESSIVE::	\\/\/\/\/\/\\\///\\/\/// 

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const multer = require("multer") ;
const fs = require("fs") ;
const path = require("path") ;

const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');



let storage = multer.diskStorage({
	destination: "./public/upload/" ,
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) ;
	}
})


const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single("steve");

// Ensuring Files are Images :: Checking Mime Type ;
function checkFileType(file, cb){
	
  const filetypes = /jpeg|jpg|png|gif/;
  
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Sorry, Images Only! ');
  }
}


router.get('/login', forwardAuthenticated, (req, res) => {
	res.render('login') 
});


router.get('/register', (req, res) => res.render('signup'));


// SETTING UP A NEW USER ;

router.post('/register', (req, res, next) => {
	let errors = [];
	
	const {
		firstname, lastname
		, email, phone
		, date, gender  
		, password ,  finalRegion 
		, finalCity , housenumber 
		, uType
		
	} = req.body;
	
	if (firstname == undefined ||lastname == undefined ||date == undefined ||email == undefined ||phone == undefined ||gender == undefined ||password == undefined ||finalRegion == undefined ||finalCity == undefined ||housenumber == undefined ||uType == undefined ) {
		errors.push({ msg: 'Please Fill all fields' });
		console.log(errors) ;
	}
	
	
	try {
		if (password.length < 6) {
			errors.push({ msg: 'Password must More Than least 6 characters' });
			console.log(errors) ;
		}
	}
	catch(err) {
		console.log(password , " Error Here") ;
	}
	if (errors.length > 0) {
		res.render('signup', {
			errors	
		});
	} else {
		User.findOne({ email: email }).then(user => {
		if (user) {
			errors.push({ msg: 'Email already exists' });
			res.render('signup', {
				errors
			});
			console.log(errors) ;
			} else {
				const newUser = new User({
					firstname, lastname
					, email, phone
					, date, gender  
					, password 
					, region: finalRegion 
					, city: finalCity 
					, housenumber 
					, userType: uType
				});
				
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser
						  .save()
						  .then(user => {
								console.log(user.firstname , " is Successfully Registered") ;
								req.flash(
									'success_msg',
									'You are now registered and can log in'
								);
								res.redirect('/users/login');
							})
							.catch(err => console.log(err));
					});
				});
			}
		});
	}
	
})


// Login
router.post('/login', (req, res, next) => {
	console.log(req.body.email) ;
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logging Out 
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are now logged out');
  res.redirect('/');
});

module.exports = router;

