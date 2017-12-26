const router = require('express').Router();
const httpError = require('../utils/HttpError');
const { User } = require('../db/models');

// This marries the original auth code we wrote to Passport.
// An alternative would be to use the "local strategy" option with Passport.

// login, i.e. "you remember `me`, right?"
// `/login` is optional because the verb and `auth/local` connotate login
  // make sure this comes after the session middleware, otherwise req.session will not be available
router.put('/login', (req, res, next) => {
  User.findOne({
    where: req.body
  })
  .then(loginUser => {
    // Without req.login as provided by Passport:
      /*
      if (!loginUser) {
        // res.sendStatus(401);
        throw httpError(404);
      } else {
        // req.login(loginUser, error => {
        //   if (error) {
        //     return next(error);
        //   }
        //   res.send(loginUser); // 200 is the default status!
        // });
        // let quarterMin = 1000 * 15;
        // req.session.cookie.expires = new Date(Date.now() + quarterMin);
        // req.session.cookie.maxAge = quarterMin;
        req.session.userId = loginUser.id; // from when we just had sessions and no passport
        res.status(200).send(loginUser);
      }
      */

    // With req.login: http://www.passportjs.org/docs/login/

      if (!loginUser) { throw httpError(404); }
      req.login(loginUser, error => {
        if (error) { return next(error); }
        res.send(loginUser); // 200 is the default status
      });

  })
  .catch(next);
});

// signup, i.e. "let `me` introduce myself"
// `/signup` is optional
router.post('/signup', (req, res, next) => {
  User.create(req.body)
  .then(createdUser => {
    // Without req.login as provided by Passport:
      /*
      if (!createdUser) { throw httpError(404); }
      req.session.userId = createdUser.id;
      res.status(201).send(createdUser); // 201 created makes a lot of sense as a status here!
      */

    // With req.login: http://www.passportjs.org/docs/login/

      req.login(createdUser, err => {
        if (err) { return next(err); }
        res.status(201).send(createdUser); // 201 created makes a lot of sense as a status here!
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
