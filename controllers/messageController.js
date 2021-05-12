const Msg = require('../models/Messages')
const { MessageNotFound } = require('../errors/index')
const { Op } = require('sequelize')


module.exports = {
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