const express = require('express');
//ejs layouts are templates similar to handlebars?
const expressLayouts = require('express-ejs-layouts');
// connecting to the mongoose database
const mongoose = require('mongoose');
//adding flash notifications
const flash = require('connect-flash')
// adding sessions
const session = require('express-session');

// basic express server
const app = express();

// connecting to the Mongo db - acutal address for db is in key.js file
// db config
const db = require('./config/keys').MongoURI;
//connect to Mongodb
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  })
  .then(() => console.log('mongo db connected'))
  .catch(err => console.log('mongo db connection error: ' , err));

// EJS middleware to allow us to use layouts and views
// orderr of initialization is important!!!
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParsser middleware
app.use(express.urlencoded({ extended: false}));

// adding express-sessions middleware
// https://www.npmjs.com/package/express-session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

// adding in middlewarre for the flash notifications
app.use(flash());

// adding global vars for different types of notifications
// always needs req, res, next - not sure what next does...
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})

// bring in the different rouutes the app needs to knoow about
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// will run on Port defined in env file or 5000 if local
const PORT = process.env.PORT || 5000;

// start the server:
app.listen(PORT, console.log(`Express Server started on PORT ${PORT}`));