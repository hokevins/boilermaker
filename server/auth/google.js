const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { User } = require('../db/models');

// don't forget to require('wherever-your-strategy-lives-to-run-that-file'); // IF your strategies live in a separate file


const googleCredentials = {
  // options for the google strategy
  clientID: require('./keys.js').google.clientID,
  clientSecret: require('./keys.js').google.clientSecret,
  callbackURL: '/auth/google/callback'
};

// The following callback will be used when passport successfully authenticates with Google (the provider) for us, using our `clientId`, `clientSecret` and the temporary token from the client
  // Google will send back the `accessToken`, `refreshToken` and `profile` - passport provides the `done` function
const verificationCallback = (accessToken, refreshToken, profile, done) => {
  // Google will send back the token and profile
  // passport callback function
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.

    // use profile and then done when finished

/*
Done Callback - Meaning
done(err) - the server failed somehow (e.g. the database is down)
done(null, false) - the server is working correctly, but the credentials are bad (no user)
done(null, user) -  the server is working, and the credentials match this user object
*/

  const info = {
    name: profile.displayName,
    email: profile.emails[0].value,
    photo: profile.photos ? profile.photos[0].value : undefined
  };

  User.findOrCreate({
      where: { googleId: profile.id }, // find this user
      defaults: info // if we don't find them, then create with this information
    })
    .spread((user, createdBool) => {
      done(null, user);
    })
    .catch(done);
};

// don't forget to install passport-google-oauth
passport.use(new GoogleStrategy(googleCredentials, verificationCallback));

// 1. Client request to login through Google -- `http://localhost:1337/auth/google`
// Google authentication and login
router.get('/', passport.authenticate('google', { scope: 'email' }));

// 2. Client hits this once they have verified with the provider (the callback URL)
   // `http://localhost:1337/auth/google/callback` - set in Google's API console dashboard
// handle the callback after Google has authenticated the user and Google's 'query code' to exchange for profile information to fire strategy's argument callback function
router.get('/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => { // a successRedirect is fine, but with this we can use `req` for a more meaningful redirect
    res.redirect(`/users/${req.user.id}`);
  }
);

module.exports = router;
