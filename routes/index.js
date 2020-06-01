//////\\//\\//\\//	::EXCESSIVE::	\\/\/\/\/\/\\\///\\/\/// 

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// User Model 
const User = require("../models/User") ;

router.get('/', forwardAuthenticated, (req, res) => {
	res.render('index')
});

// User DashBoard

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
	
	
	let homeData = [] ;
	const { firstname , lastname , email ,  phone ,  userType } = req.user ;
	
	const User = {
		firstname
		, lastname
		, email
		, phone
		, userType
	} ;
	
	
	const contentful = require('contentful') ;
	const client = contentful.createClient({
	  space: 'lzhomq8upbtl',
	  accessToken: 'jKHBCYLp65WHXEe0WE-xJ4zqx_AHORkEY3dtZuTTQxE'
	})
	
	await client.getEntries()
		.then((response) => {
			response.items.forEach((item) => {
				homeData.push(item) ;
			})
		})
		.catch((err) => console.log("Error: " , err))
		
		
		
	res.render('home', {
		User ,
		homeData
	}) ;
  
});


router.get("/account" , ensureAuthenticated , async (req, res) => {
	
	const { firstname , lastname , email ,  phone , city , region , date , userType , _id } = req.user ;
	
	const User = {
		firstname
		, lastname
		, email
		, phone
		, city
		, region
		, date
		, userType
		, id : _id
	} ;
	
	res.render("account-profile" , {
		User
	}) ;
	
	console.log(User , " User Details") ;
	
})


// ACCOUNT EDIT 

router.post("/account" , ensureAuthenticated , async(req, res) => {
	const { firstname , lastname , phone } = req.body ;
	
	let errMessage = "" ; // Message That Gets Displayed In The Case of an error 
	
	if (firstname !== undefined || lastname !== undefined || phone !== undefined) {
		
		try {
			await User.updateOne({_id: req.user._id } , {
				firstname
				, lastname
				, phone
			} , (err, next) => {
				if (err) {
					console.log("Error Updating: " , err)
					res.render("account-profile" , { errMessage }) ;
				}
				else next
			})
		}catch(err) {
			throw `An Error: ${err} `  ;
			errMessage = "Sorry, We Could Not Update Your Account Info , Please Try Again" ;
			res.render("account-profile" , { errMessage }) ;
		}
		finally {
			res.redirect("/account") ;
		}
	}
	else {
		errMessage = "Sorry, We Could Not Update Your Account Info , Please Try Again" ;
		res.render("account-profile" , { errMessage }) ;
	}
	
	
})


router.get("/account/address" , ensureAuthenticated , (req, res) => {
	
	const { firstname , lastname , email , housenumber , region , city , userType } = req.user ;
	
	const User = {
		firstname 
		, lastname 
		, email 
		, housenumber 
		, region 
		, city
		, userType
	}
	
	res.render("account-address" , {
		User
	}) ;
	
})


// ADDRESS EDIT ;

router.get("/account/address" , ensureAuthenticated ,  async (req, res) => {
	// CHANGING ONLY HOUSE ADDRESS :: WOULD EDIT THE REST ;
	
	const { housenumber	} = req.body ;
	const { _id	} = req.user ;
	
	console.log(housenumber) ;
	
	try {
		await User.updateOne({_id: _id} , {
			housenumber : housenumber
		} , (err , next) => {
			if (err)
				throw err 
			else next
			
		})
	}
	catch(err) {
		throw `Error Here ${err} ` ;
	}
	finally {
		res.redirect("/account/address") ;
	}
	
})



module.exports = router;



