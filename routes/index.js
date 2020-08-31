//////\\//\\//\\//	::EXCESSIVE::	\\/\/\/\/\/\\\///\\/\/// 

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// User Model 
const User = require("../models/User") ;

// MAIN PAGE 
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
	  space: '<TAKEN OFF FOR REPO>',
	  accessToken: '<TAKEN OFF FOR REPO>'
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
	
	console.log(homeData) ;	
	
	
});


router.get("/dashboard?view=list" , ensureAuthenticated , async(req, res) => {
	
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
		
		
	console.log(homeData , "  The Data")
	res.render('dashboard-list', {
		User ,
		homeData
	}) ;
	
	
})



module.exports = router;



