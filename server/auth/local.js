const router = require('express').Router();

// const httpError = require('../utils/HttpError');
const { User } = require('../db/models');

// This marries the original auth code we wrote to Passport.
// An alternative would be to use the "local strategy" option with Passport.

// login, i.e. "you remember `me`, right?"
// `/login` is optional because the verb and `auth/local` connotate login
  // make sure this comes after the session middleware, otherwise req.session will not be available
router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found');
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password');
      } else {
        // With req.login: http://www.passportjs.org/docs/login/
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

// signup, i.e. "let `me` introduce myself"
// `/signup` is optional
router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

// logout, i.e. "please just forget `me`"
// `/logout` is optional
router.delete('/logout', (req, res, next) => {

  // With req.logout as provided by Passport:
  req.logout();

  /* Below is from when we just had sessions and no passport */
  // delete req.user;
  // req.session.destroy(); // destroys entire session

  /* Below are alternatives to the above
  delete req.session.userId; // deletes one item on session
  req.session.userId = null;
  */

  res.sendStatus(204);
});

// check currently-authenticated user, i.e. "who am I?"
// `/me` is optional
router.get('/me', (req, res, next) => {
  res.send(req.user);
});

module.exports = router;
