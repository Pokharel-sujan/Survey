const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//const GoogleStrategy = require("passport-google-oauth20");

//not to get problem when running the test
const mongoose = require('mongoose');
const keys = require("../config/keys");

const User = mongoose.model('users');  // creating a user model

passport.serializeUser((user, done)=>{
    done(null, user.id);   // done is call back , user is mongoose model instance

});

passport.deserializeUser((id, done)=>{
    User.findById(id).then(user=> {
        done(null,user);
    });
});


passport.use( new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy:true
    },
    // google wll give us accesstoken, refreshtoken => that allows to refresh accesstoken and profile has our info.
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id})

        if (existingUser){
            return done(null, existingUser);      // we already have a record with the given profile ID
        }

        const user = await new User({googleId : profile.id}).save() //we don't have a user record with this ID, so make a new record
        done(null,user);
        }
    )
);


// app.get('/auth/google/callback', passport.authenticate('google))
// hello this is the change