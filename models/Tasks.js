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
        allowNull: true
    }


})

// Task.updateImage = async (imageName) => {
//     const newImage = await Task.findOne({ where: { id } })
//     newImage.imageName = `/upload_images/${file.name}`
//     await newImage.save()
// }




//Tasks.belongsTo ( User )  
Tasks.belongsTo(User, { as: 'client', constraints: false })
Tasks.belongsTo(User, { as: 'worker', constraints: false })





module.exports = Tasks