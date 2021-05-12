const {InvalidBody,TaskNotFound,UserNotFound}=require('../errors/index')

const Task=require('../models/Tasks')
const User=require('../models/User')
const path=require('path')
const { v4: uuid } = require('uuid');
const Tasks = require('../models/Tasks');

module.exports={
    async create(req,res,next){
        try{
            const {taskName,clientId} = req.body
            if( !taskName || !clientId ){
                throw new InvalidBody(['taskName','clientId'])
            }
            const workerId=req.user.id
            const task  = await Task.create({taskName,clientId,workerId})
            res.json({task}) 
        }catch(error){next(error)}
    },

    async addImage(req,res,next){
        try{
            const {id}=req.params
            const file=req.files.pictures
            if( !file ){
                throw new InvalidBody(['file'])
            }

            const findTask = await Task.findOne({where:{id}})
            if(!findTask){ throw new TaskNotFound(id) }
            const extension=path.extname(file.name)
            const newFileName=uuid()+extension
            const outputPath=path.join("upload_images",newFileName)

            file.mv(outputPath,  (err) => {
                if (err) return res.status(500).send(err)
                Task.update(
                    {imageName:newFileName},
                    {where:{id}}
                );
            res.json({message:'image has added!'}) 
            })
        }catch(error){next(error)}
    },

    async getTaskByClientName(req, res, next) {
        const {name} = req.query
        try {
            const user = await User.findOne({where: {name}})
            if(!user){ throw new UserNotFound() }
            const userId=user.id
            const tasks=await Task.findAll({
                    where: {
                        clientId:userId
                    }
              });

            res.json({ tasks })
        } catch (error) { next(error) }
    },



    
    async updateTaskById(req,res,next){
        try{
            const {id}=req.params
            const {taskName,clientId} = req.body
            const {done}=req.query
            const field={}

            if(taskName) field.taskName=taskName
            if(clientId) field.clientId=clientId
            if(done) field.done=done

            const findTask = await Task.findOne({where:{id}})
            if(!findTask){ throw new TaskNotFound(id) }
            
            
            await Task.update(field,{where:{id}})
            res.json({message:'Task has pdated'})
        }catch(error){next(error)}

    },

    async getTaskById(req,res,next){
        try {
            const { id } = req.params
            const task = await Task.findOne({
                where: {id}
            })
            if (!task) { throw new TaskNotFound() }
            res.json({ task })
        } catch (error) { next(error) }
    },
    


}