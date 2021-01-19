const express = require('express');
const router = express.Router();

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
    res.send('pass');
  }
})
module.exports = router;