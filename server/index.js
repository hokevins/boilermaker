const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

/* "Enhancing" middleware (does not send response, server-side effects only) */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* "Responding" middleware (may send a response back to client) */
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

/* Static middleware */
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

// Any routes or other various middlewares should go here
/* "Responding" middleware (may send a response back to client) */
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

// send index.html for any route that doesn't match any API routes
// make sure this comes after all of your routes in your server entry file
const validFrontendRoutes = ['*', '/', '/users', '/users/:id', '/signup', '/login'];
const indexPath = path.join(__dirname, '../public/index.html');
validFrontendRoutes.forEach(stateRoute => {
  app.get(stateRoute, (req, res, next) => {
    res.sendFile(indexPath);
  });
});

app.use((err, req, res, next) => {
  // console.error(err); // need this still too?
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Error');
});

module.exports = app;
