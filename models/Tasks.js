const { DataTypes } = require('sequelize')
const db = require('../database/connection')
const User=require('./User')


const Tasks = db.define('Tasks', {
    taskName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    imageName: {
        type: DataTypes.STRING,
        defaultValue:""
    }


})


Tasks.belongsTo ( User )  
Tasks.belongsTo(User, { as: 'client', constraints: false })

module.exports = Tasks