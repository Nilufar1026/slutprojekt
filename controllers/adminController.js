const {InvalidBody,UserNotFound}=require('../errors/index')
const User=require('../models/User')
const Task=require('../models/Tasks')

module.exports={
    // async all(req,res,next){
    //     try{
    //         const users=await User.findAll({attributes:{exclude:['password']}})
    //         res.json({users})
    //     }catch(error){next(error)}    
    // },    

    async create(req,res,next){
        try{
            const {email,name,password,role}=req.body
            if( !email || !name || !password || !role){
                throw new InvalidBody(['email','name','password','role'])
            }
            const user  = await User.create({email,name,password,role})
            res.json({message:`You have registered ${user.role}!`})            
        }catch(error){next(error)}    
    },

    async updateUserById(req,res,next){
        try{
            const {id}=req.params
            const {email,name,password,role} = req.body
            const field={}
            if(email) field.email=email
            if(name) field.name=name
            if(password) field.password=password
            if(role) field.role=role
    
            const getUser = await User.findOne({where:{id}})
            if(!getUser){ throw new UserNotFound(id) }
            
            await User.update(field,{where:{id}})
            res.json({message:'user has updated!'})
        }catch(error){next(error)}
    },

    async deleteUserById(req,res,next){
        try{
            const {id}=req.params
            const getUser = await User.findOne({where:{id}})
            await getUser.destroy()
            res.json({message: 'user has deleted!' })
        }catch(error){next(error)}
    },

    async deleteTaskById(req,res,next){
        try{
            const {id}=req.params
            const task = await Task.findOne({where:{id}})
            await task.destroy()
            res.json({message:` task id:${task.id} has deleted!`})
        }catch(error){next(error)}
    },

}