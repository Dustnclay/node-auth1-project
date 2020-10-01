const knex = require('knex');
const knexfile = require('../knexfile')

const evironment = "development"

module.exports = knex(knexfile[evironment]);