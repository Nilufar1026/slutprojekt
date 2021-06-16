const User = require('../models/User')
const { InvalidBody, Unauthorized, UserNotFound } = require('../errors/index')
const { Op } = require('sequelize')
const bcryptjs=require('bcryptjs')

module.exports = {
    async create(req,res,next){
        try{
            let {email,name,password,role}=req.body
            if( !email || !name || !password || !role){
                throw new InvalidBody(['email','name','password','role'])
            }
             password = bcryptjs.hashSync(password, 10)
             const newUser  = await User.create({email,name,password,role})
            res.json({message:`You have registered ${newUser.role}!`})            
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
            if(!getUser){ throw new UserNotFound(id) }
            await getUser.destroy()
            res.json({message: 'user has deleted!' })
        }catch(error){next(error)}
    },

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) { throw new InvalidBody() }
            const token = await User.authenticate(email, password)
            res.json({ token, email })
        } catch (error) { next(error) }
    },

    async me(req, res, next) {
        const email = res.user.email
        const user = await User.findOne({ where: { email } })
        const name = user.name
        res.json({ "email": email, "name": name })
    },

    async updateUserProfile(req, res, next) {
        const email = res.user.email
        try {
            const { newEmail, newName, newPassword } = req.body
            if (!email || !newEmail || !newName || !newPassword) {
                throw new InvalidBody()
            }
            const newProfile = await User.updateProfile(email, newEmail, newName, newPassword)
            res.json({ newProfile, msn: "Your profile was updated successfully" })
        } catch (error) { next(error) }
    },

    async getAllUsers(req, res, next) {
        const user = res.user
        const name = req.query.name
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }, where: {
                    name: {
                        [Op.substring]: name
                    }
                }
            })
            if (user.role == 'client') { throw new Unauthorized() }
            res.json({ users })
        } catch (error) { next(error) }
    },

    async getUserById(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findOne({
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }, where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            })
            if (!user) { throw new UserNotFound() }
            res.json({ user })
        } catch (error) { next(error) }

    },
}