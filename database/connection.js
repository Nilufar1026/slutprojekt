const { Sequelize } = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/users.db'
})

module.exports = db