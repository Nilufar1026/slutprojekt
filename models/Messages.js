const { DataTypes } = require('sequelize')
const db = require('../database/connection')
const Task = require('./Tasks')


const Messages = db.define('Messages', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

Task.hasMany ( Messages )
Messages.belongsTo ( Task )


module.exports = Messages