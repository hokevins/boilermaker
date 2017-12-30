'use strict';

const Sequelize = require('sequelize');

const pkg = require('../../package.json');
const databaseURI = `postgres://localhost:5432/${pkg.name}`;

/*
If you are using Heroku as a deployment service and Heroku Postgres as your database, remember that the database url in your Heroku environment will be available in an environment variable DATABASE_URL. Prepare your sequelize instance to take advantage of this, and only use your local database url if no DATABASE_URL is available.
*/

const db = new Sequelize(process.env.DATABASE_URL || databaseURI, {
  logging: false // there are many other options you may want to play with i.e. timestamps: false or underscored: true etc. (used with the 'define' object before 'logging: false')
});

module.exports = db;
