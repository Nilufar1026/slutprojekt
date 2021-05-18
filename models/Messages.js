const { DataTypes } = require('sequelize')
const db = require('../database/connection')
const Task = require('./Tasks')
const User = require('./User')


const Messages = db.define('Messages', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

Task.hasMany ( Messages )
User.hasMany ( Messages )
Messages.belongsTo ( Task )
Messages.belongsTo ( User )


module.exports = Messages