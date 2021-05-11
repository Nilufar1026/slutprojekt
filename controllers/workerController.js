const {InvalidBody,taskNotFound}=require('../errors/index')

const Task=require('../models/Tasks')
const path=require('path')

module.exports={
    async create(req,res,next){
        try{
            const {taskName,clientId} = req.body
            if( !taskName || !clientId ){
                throw new InvalidBody(['taskName','clientId'])
            }
            const UserId=req.user.id
            const task  = await Task.create({taskName,clientId,UserId})
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
            if(!findTask){ throw new taskNotFound(id) }
            if(findTask.UserId != req.user.id){ throw new unauthorized() }


            await file.mv(path.resolve(__dirname, 'public/images', file.name), () => {
                Task.update({
                    imageName:`/images/${file.name}`,
                    where:{id}
                });
               res.json({message:'image has updated!'}) 
            })
        }catch(error){next(error)}
    },




    async getTaskByClientName(req,res,next){

    },


}