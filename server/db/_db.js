'use strict';

const Sequelize = require('sequelize');

const pkg = require('../../package.json');
const databaseURI = `postgres://localhost:5432/${pkg.name}`;

const db = new Sequelize(databaseURI, {
  logging: false
});

module.exports = db;
