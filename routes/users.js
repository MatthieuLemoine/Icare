var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/users');
}
/* GET users listing. */
router.get('/', function(req, res) {
  res.redirect('/#/admin');
});
router.get('/board', isAuthenticated,function(req,res){
	res.redirect('board');
});
/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash : true 
}));
/* Handle  SignUp POST */
router.post('/signup'passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash : true 
}));
/* Handle Logout */
router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
