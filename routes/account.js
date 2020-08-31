//////\\//\\//\\//	::EXCESSIVE::	\\/\/\/\/\/\\\///\\/\/// 

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// User Model 
const User = require("../models/User") ;
const Cart = require("../models/Cart") ;


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
	
	const { firstname , lastname , email , housenumber , region , city , userType, phone } = req.user ;
	
	const User = {
		firstname 
		, lastname 
		, email 
		, housenumber 
		, region 
		, city
		, userType
		, phone
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


let app = require("express")() ;
	let http = require("http").createServer(app) ;
	let io = require("socket.io")(http) ;
	
	
	io.on("connection" , (socket) => {
		console.log("User Connected") ;
		
		socket.on("send" , (msg) => {
			console.log("Message Here : " , msg) ;
		})
		
	})

/*****************************/

router.get(`/dashboard/:anytn/cart` , async (req, res) => {
	const contentful = require('contentful') ;
	const client = contentful.createClient({
	  space: '<TAKEN OFF FOR REPO>',
	  accessToken: '<TAKEN OFF FOR REPO>'
	}) ;
	
	await client.getEntries()
		.then((response) => {
			response.items.forEach((item) => {
				homeData.push(item) ;
			})
		})
		.catch((err) => console.log("Error: " , err))
	
	
	
	
})

// CONTINUE ON TUESDAY ;
router.post("/dashboard/:anytn/cart" , (req, res) => {
	
	cartId = req.body.msg ;
	
	let newCart = new Cart({
		cartId 
	})
	newCart.save() ;
		
		
		
	console.log("Ref ID : " , cartId) ;
	
	
})



module.exports = router;






