var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user);
    /* User.findById(id, (err, user) => {
        done(err, user)
    }); */
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://wyzr-assignment.herokuapp.com/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    /* User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    }); */
    done(null, profile)
  }
));