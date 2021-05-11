const User = require("../models/User")
const Task = require("../models/Tasks")

module.export = {
    async getMessage(req, res, next){
        try{
            const clientid = req.user.id
            const clientTask = await Task.findAll({where:{clientid}})
            res.json({"tasks": clientTask})
        }

        catch(error) {next(error)}
    },

    async newMessage(req, res, next){
        try{

        } catch{

        }
    },

    async deleteMessage(req, res, next){
        try{

        } catch{

        }
    }
}