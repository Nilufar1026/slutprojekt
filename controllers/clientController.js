const Task = require('../models/Tasks')
const { Op } = require('sequelize')
const { TaskNotFound } = require('../errors/index')

module.exports = {
    async getTask(req, res, next) {
        const clientId = res.user.id
        try {
            const myTask = await Task.findAll({ attributes: { exclude: ['taskId', 'clientId', 'workerId', 'createdAt', 'updatedAt'] }, where: { clientId: clientId } })
            res.json({ myTask })
        } catch (error) { next(error) }
    },

    async getTaskById(req, res, next) {

        try {
            const { id } = req.params
            const task = await Task.findOne({
                attributes: { exclude: ['createdAt', 'updatedAt'] }, where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            })
            if (!task) { throw new TaskNotFound() }
            res.json({ task })
        } catch (error) { next(error) }
    }
}