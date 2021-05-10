const User = require('../models/User')
const Task = require('../models/Tasks')
// const { InvalidBody, Unauthorized, UserNotFound } = require('../errors/index')
// const { Op } = require('sequelize')


module.exports = {
    async getTask( req, res, next){
        const user = res.user
        try {
            const myTask = await Task.findAll({ attributes: {exclude: ['taskId', 'clientId', 'workerId']}})

            res.json({myTask})
        } catch(error) {next(error)}
    }
}