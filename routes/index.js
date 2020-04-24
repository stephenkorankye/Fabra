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


//My profile endpoint
router.get('/profile', isLoggedin,(req,res,next)=>{
    Order.find({userEmail:req.user.email}).then((orders)=>{
        console.log(orders);
        res.render('routes_UI/profile', {user:req.user,orders:orders});
    })
})

//Reducing item quantity in cart
router.get('/reduce/:id',(req,res)=> {
    
    let cart= new Cart(req.session.cart ? req.session.cart : {} );
    cart.reduceByOne(req.params.id);
    cart.generateArray();
    req.session.cart= cart;
    
    if(req.isAuthenticated()){ 
        User.findOne({email:req.user.email}).then((user)=> {
            user.cart= cart;  
            user.save();
            console.log(user.cart);
        })
    }
    console.log(req.session.cart);   
    res.redirect('/cart');    
})

//Removing item from the cart
router.get('/removeItem/:id',(req,res)=> {
    
    let cart= new Cart(req.session.cart ? req.session.cart : {} );
    cart.removeItem(req.params.id);
    cart.generateArray();
    req.session.cart= cart;
    
    if(req.isAuthenticated()){ 
        User.findOne({email:req.user.email}).then((user)=> {
            user.cart= cart;  
            user.save();
            console.log(user.cart);
        })
    } 
    console.log(req.session.cart);
    res.redirect('/cart');    
})

//Adding item to cart
router.put('/add-to-cart/:id',(req,res,next)=> {

    let cart= new Cart(req.session.cart ? req.session.cart : {} );
    
    Product.findById(req.params.id).then((product)=> {
    
        cart.add(product, product.id);
        cart.generateArray();
        req.session.cart= cart;
        
        if(req.isAuthenticated()){
           User.findOne({email:req.user.email}).then((user)=> {
           user.cart=req.session.cart;
             user.save().then(()=>{
                  res.redirect('/'); 
             })
        })
        }else{
            res.redirect('/'); 
        }   
    }); 
});


//Cart Endpoint
router.get('/cart',(req,res)=> {
    
    let cart= req.session.cart || {};
    let itemsArray= cart.itemsArray ||[];
    
    res.render('routes_UI/cart',{cart, itemsArray, user:req.user});
})

