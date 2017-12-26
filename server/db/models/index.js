const db = require('../_db');
const User = require('./user');

// Associations go here:
User.belongsTo(User, {as: 'user'});

module.exports = {
  db,
  User
};
