const { InvalidBody, TaskNotFound, UserNotFound } = require('../errors/index')

const Task = require('../models/Tasks')
const User = require('../models/User')
const path = require('path')
const { v4: uuid } = require('uuid');



module.exports = {
    async create(req, res, next) {
        console.log("hej jag är new task i backend")
        try {
            const user=res.user
            const { taskName, clientId } = req.body
            if (!taskName || !clientId) {
                throw new InvalidBody(['taskName', 'clientId'])
            }
            const workerId = user.id
            const task = await Task.create({ taskName, clientId, workerId })
            res.json({ task })
        } catch (error) { next(error) }
    },


    async addImage(req, res, next) {
        try {
            const { id } = req.params
            const file = req.files.pictures
            if (!file) {
                throw new InvalidBody(['file'])
            }

            const findTask = await Task.findOne({ where: { id } })
            if (!findTask) { throw new TaskNotFound(id) }
            const extension = path.extname(file.name)
            const newFileName = uuid() + extension
            const outputPath = path.join("upload_images", newFileName)

            file.mv(outputPath, (err) => {
                if (err) return res.status(500).send(err)
                Task.update(
                    { imageName: newFileName },
                    { where: { id } }
                );
                res.json({ message: 'image has added!' })
            })
        } catch (error) { next(error) }
    },



    async getTaskByClientName(req, res, next) {
        const name = req.query.name
        const done = req.query.done

        try {
            const user = await User.findOne({ where: { name } })
            if (!user) { throw new UserNotFound() }
            const userId = user.id
            if (done) {
                const doneTasks = await Task.findAll({
                    where: {
                        clientId: userId,
                        done
                    }
                });
                res.json({ doneTasks })
            } else {
                const allTasks = await Task.findAll({
                    where: {
                        clientId: userId,
                    }

                });
                res.json({ allTasks })
            }
        } catch (error) { next(error) }
    },

    async updateTaskById(req, res, next) {
       console.log(req.body);
        try {
            const { id } = req.params
            const { taskName, clientId, taskStatus } = req.body
            // const { done } = req.query
            const field = {}

            if (taskName) field.taskName = taskName
            if (clientId) field.clientId = clientId
            if (taskStatus) field.done = taskStatus

            const findTask = await Task.findOne({ where: { id } })
            if (!findTask) { throw new TaskNotFound(id) }


            await Task.update(field, { where: { id } })
            res.json({ message: 'Task has updated' })
        } catch (error) { next(error) }

    },

    async getTaskById(req, res, next) {
        try {
            const { id } = req.params
            const task = await Task.findOne({
                where: { id }
            })
            if (!task) { throw new TaskNotFound() }
            res.json({ task })
        } catch (error) { next(error) }
    },

    async deleteTaskById(req, res, next) {
        console.log("soy delete desda backend")
        try {
            const { id } = req.params
            console.log(req.params);
            const task = await Task.findOne({ where: { id } })
            if (!task) { throw new TaskNotFound(id) }
            await task.destroy()
            res.json({ message: ` task id:${task.id} has deleted!` })
        } catch (error) { next(error) }
    },

    async getTask(req, res, next) {
        const clientId = res.user.id
        try {
            const myTask = await Task.findAll({ attributes: 
                { exclude: ['taskId', 'clientId', 'workerId', 'createdAt', 'updatedAt'] }, 
                where: { clientId: clientId } })
            res.json({ myTask })
        } catch (error) { next(error) }
    },

    async getTaskWorker(req, res, next) {
        const workerId = res.user.id
        try {
            const workerTask = await Task.findAll({ attributes: 
                { exclude: ['taskId', 'clientId', 'workerId', 'createdAt', 'updatedAt'] }, 
                where: { workerId: workerId } })
            res.json({ workerTask })
        } catch (error) { next(error) }
    },


}