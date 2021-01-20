// authentication guard so that you can't access content if not logged in

// export module
module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }

    req.flash('error_msg', 'Please login first');
    res.redirect('/users/login');
  }
}