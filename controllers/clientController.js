const Task = require('../models/Tasks')
const Msg = require('../models/Messages')
const { Op } = require('sequelize')
const { TaskNotFound } = require('../errors/index')
const { getMessageFromTask } = require('./messageController')

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
    },


    async createMessage(req, res, next) {
        try {
            const taskId = req.params.id
            const { content } = req.body
            if (!content) {
                throw new InvalidBody(['content'])
            }
            const message = await Msg.create({ content: content, TaskId: taskId })
            res.json({ message })
        } catch (error) { next(error) }
    },

    async getMessageFromTask(req, res, next) {
        console.log("AAAAAAA")
        try {
            const taskId = req.params.id
            const msgFromTask = await Msg.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] }, where: {
                    TaskId: {
                        [Op.eq]: taskId
                    }
                }
            })
            if (!msgFromTask) { throw new MessageNotFound() }
            res.json({ msgFromTask })

        } catch (error) { next(error) }
    },

    async deleteMessage(req, res, next) {
        try {
            const msg_id = req.params.id
            const msg = await Msg.findOne({ where: msg_id })
            if (!msg) { throw new MessageNotFound() }
            await msg.destroy()
            res.json({ message: 'Message has deleted!' })

        } catch (error) { next(error) }
    }
}