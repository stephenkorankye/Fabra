var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const {Product} = require('../models/product');
const {User}= require('../models/user');
const {Order} = require('../models/order');
const Cart= require('../models/cart');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');

router.all('/*',(req,res,next)=> {
    req.app.locals.layout= 'layout';
    next();
})

//checking for logged out
const isLoggedout= (req,res,next)=>{
    if(! req.isAuthenticated()){
        next();
    }else{
        req.flash('error_message', `You need to logout first`);
        res.redirect('/');
    }
}

//checking for logged in
const isLoggedin= (req,res,next)=>{
    if(req.isAuthenticated()){
        User.findOne({email:req.user.email}).then((user)=>{
            req.session.cart = user.cart;
        })
        next();
    }else{
        req.flash('error_message', 'You need to login first.');
        res.redirect('/');
    }
}

//


//sign up endpoint
router.get('/signup',isLoggedout,(req,res,next)=>{
    res.render('routes_UI/signup');
})

//login endpoint
router.get('/login', isLoggedin,(req,res,next)=>{
    res.render('routes_UI/login');
})