const Msg = require('../models/Messages')
const { MessageNotFound } = require('../errors/index')
const { Op } = require('sequelize')

function parseQuery(query){
    const page = +query.page || 1
    let pageSize = +query.pageSize || 10
    pageSize = pageSize > 10 ? 10 : pageSize
    pageSize = pageSize < 1 ? 1 : pageSize
    return {page, pageSize}
  }

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

    // async getMessageFromTask(req, res, next) {
    //     try {
    //         const taskId = req.params.id
    //         const msgFromTask = await Msg.findAll({
    //             attributes: { exclude: ['createdAt', 'updatedAt'] }, where: {
    //                 TaskId: {
    //                     [Op.eq]: taskId
    //                 }
    //             }
    //         })
    //         if (!msgFromTask) { throw new MessageNotFound() }
    //         res.json({ msgFromTask })

    //     } catch (error) { next(error) }
    // },

    async getMessageFromTask(req, res, next) {
        try {
            const { page, pageSize} = parseQuery(req.query)
            const taskId = req.params.id
            const msgFromTask = await Msg.findAll({
                limit: pageSize,
                offset: (page-1)*pageSize,
                attributes: { exclude: ['updatedAt'] }, where: {
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