const Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');

const db = require('../_db');

/*
The following is an example of a very robust user model that contains methods and hooks for encrypting and authenticating passwords. It also contains a helpful sanitize method you can use to make sure you don't send any more information than needed down to the client.
*/

const User = db.define('user', {
  name: Sequelize.STRING,
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-photo.jpg'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: Sequelize.STRING, // make sure that the password we store is salted and hashed! NEVER store the plain password
  salt: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  googleId: Sequelize.STRING,
});

// INSTANCE METHODS
User.prototype.correctPassword = (candidatePassword) => {
  // should return true or false for if the entered password matches
  return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
};

User.prototype.sanitize = () => {
  // helpful method to make sure you don't send any more information than needed down to the client
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// CLASS METHODS
User.generateSalt = () => {
  // this should generate our random salt
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = (plainText, salt) => {
  // accepts a plain text password and a salt, and returns its hash
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

// const setSaltAndPassword = (user) => {
//   // we need to salt and hash again when the user enters their password for the first time
//   // and do it again whenever they change it
//   if (user.changed('password')) {
//     user.salt = User.generateSalt();
//     user.password = User.encryptPassword(user.password, user.salt);
//   }

// };

User.beforeCreate((user) => {
  // we need to salt and hash when the user enters their password for the first time...
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
});

User.beforeUpdate((user) => {
  // ...and salt and hash again whenever they change it
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
});

module.exports = User;
