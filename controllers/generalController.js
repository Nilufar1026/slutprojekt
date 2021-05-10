const User = require('../models/User')
const { InvalidBody, Unauthorized } = require('../errors/index')

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
        try {
            const users = await User.findAll({ attributes: { exclude: ['password'] } })
            if(user.role == 'client'){ throw new Unauthorized()}
            res.json({ users })
        } catch (error) { next(error) }
    },

}