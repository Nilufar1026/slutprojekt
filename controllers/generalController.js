const User = require('../models/User')
const { InvalidBody, Unauthorized, UserNotFound } = require('../errors/index')
const { Op } = require('sequelize')

module.exports = {
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

    async update(req, res, next) {
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

    async getAllUser(req, res, next) {
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
            console.log(id);
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