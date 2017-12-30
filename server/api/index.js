const router = require('express').Router();
const httpError = require('../utils/HttpError');

router.use('/users', require('./user'));

// Any middleware to serve up 404s should go here
router.use((req, res, next) => {
  throw httpError(404);
});

module.exports = router;
