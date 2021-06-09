const express = require('express');
const route = express.Router();
const bcrypt = require('bcryptjs');
const services = require('../services/render');
const passport = require('passport');
const controller = require('../controller/controller');
const userdb = require('../model/model')
const auth = require('../config/auth');



const  credential = {
  email : "admin@gmail.com",
  password : "admin123"
}


// // login user
// route.post('/login-user', (req, res)=>{

//   var a = userdb.findOne({email:req.body.email 
//   }, 
//   (error,doc)=>{if(error)throw error; 
//     res.redirect ('/dashboard')})
//   //compare(req.body.password==password)

// //   if(req.body.email == credential.email && req.body.password == credential.password){
// //       req.session.user = req.body.email;
// //       console.log(req.session.user)
// //       res.redirect('/dashboard');
// //       //res.end("Login Successful...!");
// //   }else{
// //       res.end("Invalid Username")
// //   }
// });

// Login
route.post('/login-user', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login-user',
    failureFlash: false
  })
  (req, res, next);
});
// Logout
route.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login-user');
});

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)
route.get('/login-user', services.login_user)
route.get('/success-login', services.successlogin)
/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)


// API
route.post('/api/users', controller.create);


route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route