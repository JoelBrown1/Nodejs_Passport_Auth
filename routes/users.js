const express = require('express');
const User = require('../models/User');
const router = express.Router();
// encrypting library
const bcrypt = require('bcryptjs');
//need passport
const passport = require('passport');

// bring in the user model
const Useer = require('../models/User');

// login page path
router.get('/login', (req, res) => res.render("login"));
// register page path
router.get('/register', (req, res) => res.render("register"));

// Register Handle
router.post('/register', (req, res) => {
  // just see what is passed in the form
  console.log( 'body of the requestt: ',req.body );
  const {name, email, password, password2} = req.body;

  // validate the data from the form
  let errors = [];
  // check for required fields
  if( !name || !email || !password || !password2) {
    errors.push({msg:'please fill in all fields'});
  }
  if(password !== password2) {
    errors.push({msg: 'passwords don\'t match'});
  }
  if(password.length < 6) {
    errors.push({msg:'password should be at least 6 characters'});
  }

  if(errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    // validation passes
    User.findOne({email: email})
      .then(user => {
        if (user) {
          errrors.push({msg: 'that email is already taken'});
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          })
        } else {
          // creatte a new instance of user
          const newUser = new User({
            name,
            email,
            password
          });
          // console.log('this is the new user: ', newUser);
          // res.send('new user is created');

          // HASH password
          // generate a sault
          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(
            newUser.password, 
            salt, 
            (err, hash) => {
              if(err) throw err;

              // set user password to hash value
              newUser.password = hash;

              // save the user to the "Collection" db - test1
              newUser.save()
                .then( user => {
                  /**
                   * before redirecting to the login page
                   * let the user knoow that they have successfully loged in
                   */
                  req.flash('success_msg', "you have successfully registered and can log in")
                  // go to the login page
                  res.redirect('/users/login')
                })
                .catch(err => console.log('there was an error trying to save the user: ', err))
          }))
        }
    })
  }
});

// login handle to authenticate
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
});

// logout handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are now logged out');
  res.redirect('/users/login');
})
module.exports = router;