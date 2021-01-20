/**
 * PASSPORT: 
 * using a local stragety
 * http://www.passportjs.org/docs/downloads/html/
 */
const LocalStrategy = require('passport-local').Strategy;

// need mongoose to check for email, password because we're logging in
const mongoose = require('mongoose');

// need decrypt password so that we can compare it
const bcrypt = require('bcryptjs');

// bring in the user model
const User = require('../models/User');

// want to export the strategy being used
// uses the passport property from the app.js file
// LocalStrategy requires some properties
// usernameField is the default, we don't have that so we substitute it with email
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'email',
    }, (email, password, done) => {
      // match user based on email
      User.findOne({email: email})
        .then(user => {
          console.log('passport user find one result: ', user);
          if(!user) {
            // done takes (error, user, {optional extra properties})
            console.log('passport user find one no user block');
            return done(null, false, {message: 'that email isn\'t registered'});
          }

          // match the password
          /** bcrypt is used because:
           * password in the db is encrypted (user.password)
           * password from form is a string (password)
           * isMatch is a boolean value
           */
          bcrypt.compare(password, user.password, (err, isMatch) => {
            console.log('passport config compare error: ', err);
            if(err) throw err;

            if(isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {message: 'password was incorrect'});
            }
          });
        })
        .catch (err => {
          return console.log('there was a problem with the passport email')
        });
    })
  );

  // http://www.passportjs.org/docs/configure/
  // serialize the user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
