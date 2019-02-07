var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
//var findOrCreate = require('find-or-create');

passport.use(new FacebookStrategy({
    clientID: "337771393733381",
    clientSecret: "e61c385bb897f1619cc35008d88a81b2",
    callbackURL: "https://localhost:8443/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    
    console.log("PROFIILI LÖYDETTY, ID ON" + profile.id);
    console.log(profile);



    User.create({name: profile.displayName,userid: profile.id, accesstoken: accessToken}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

module.exports = passport;