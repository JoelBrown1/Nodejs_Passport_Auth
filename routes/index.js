const express = require('express');
const router = express.Router();

/**
 * too handle different routes or paths
 * handle the request method (get, post, ...)
*/
router.get('/', (req, res) => res.render('welcome'));
router.get('/dashboard', (req, res) => res.render('dashboard'));
module.exports = router;