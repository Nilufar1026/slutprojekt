const { DataTypes } = require('sequelize')
const db = require('../database/connection')
const User = require('./User')

const Tasks = db.define('Tasks', {
    taskName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    imageName: {
        type: DataTypes.STRING,
        allowNull: true
    },

    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})
 
Tasks.belongsTo(User, { as: 'client', constraints: false })
Tasks.belongsTo(User, { as: 'worker', constraints: false })

module.exports = Tasks