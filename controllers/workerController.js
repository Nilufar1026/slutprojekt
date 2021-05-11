const {InvalidBody,taskNotFound}=require('../errors/index')

const Task=require('../models/Tasks')
const path=require('path')
const { v4: uuid } = require('uuid');

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


            console.log(file)
            if( !file ){
                throw new InvalidBody(['file'])
            }


            const findTask = await Task.findOne({where:{id}})
            if(!findTask){ throw new taskNotFound(id) }

            // give unic name for the file.
            const extension=path.extname(file.name)
            const newFileName=uuid()+extension

            const outputPath=path.join("upload_images",newFileName)


             file.mv(outputPath, (err) => {
                if (err) return res.status(500).send(err)
                Task.update(
                    {imageName:newFileName},
                    {where:{id}}
                );
                //await newImage.reload();
            res.json({message:'image has added!'}) 
            })
        }catch(error){next(error)}
    },


  
      
        

    async getTaskByClientName(req,res,next){

    },


}