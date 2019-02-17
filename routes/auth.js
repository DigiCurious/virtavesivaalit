var express = require('express');
var router = express.Router();
var passportFacebook = require('../auth/facebook');

/* LOGIN ROUTER */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Rekisteröidy' });
});

/* LOGOUT ROUTER */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* FACEBOOK ROUTER */
router.get('/facebook',
  passportFacebook.authenticate('facebook'));

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', { successRedirect: '/register210418/confirmation', failureRedirect: '/login' }));

module.exports = router;