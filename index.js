const express = require("express");
const passport = require("passport");
const Strategy = require("passport-google-oauth20").Strategy;
const app = express();
const keys = require("./config/keys");

// Tell passport how to use google strategy in our app
passport.use(
  new Strategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken,profile,refreshToken) => {
      console.log(accessToken)
      console.log(profile)
      console.log(refreshToken)
    }
  )
);

// Route to intiate the google passport strategy
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// callback for google auth. Passport takes care of the redirect, and using the code 
app.get("/auth/google/callback", passport.authenticate("google"))

// For Heroku deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT);
