// create a user model to work with the db
const mongoose = require('mongoose');

// create the user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },

});

// create a model from the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;