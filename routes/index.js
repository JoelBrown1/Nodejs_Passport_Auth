const express = require('express');
const router = express.Router();

// bring in the auth guuard
const { ensureAuthenticated } = require('../config/auth');

/**
 * too handle different routes or paths
 * handle the request method (get, post, ...)
*/
// Welcome page route
router.get('/', (req, res) => res.render('welcome'));
// dashboard route which isprotected by the authentication config
router.get('/dashboard', ensureAuthenticated, (req, res) => 
  res.render( 'dashboard', {  
    name: req.user.name 
  }));

module.exports = router;