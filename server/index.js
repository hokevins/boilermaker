const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const db = require('./db/_db');
const passport = require('passport');
const { User } = require('./db/models');

const app = express();

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();

/* "Enhancing" middleware (does not send response, server-side effects only) */
app.use(session({
  // protect/secure by setting an environment variable called SESSION_SECRET on the deployment server
  secret: process.env.SESSION_SECRET || 'matcha',
  // plug the store into our session middleware
  store: dbStore,
  // this option says if you haven't changed anything, don't resave. It is recommended and reduces session concurrency issues
  resave: false,
  // setting this option to true says if I am new but not modified still save
  saveUninitialized: false
})); // this gives us req.session!

app.use(passport.initialize()); // middleware required to initialize Passport
app.use(passport.session()); // hooks into the persistent sessions we are using

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Static middleware */
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

/* "Responding" middleware (may send a response back to client) */
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));
// send index.html for any route that doesn't match any API routes
// make sure this comes after all of your routes in your server entry file
const validFrontendRoutes = ['*', '/', '/users', '/users/:id', '/signup', '/login'];
const indexPath = path.join(__dirname, '../public/index.html');
validFrontendRoutes.forEach(stateRoute => {
  app.get(stateRoute, (req, res, next) => {
    res.sendFile(indexPath);
  });
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  // console.error(err); // need this still too?
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal error');
});

module.exports = app;
