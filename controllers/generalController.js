const User = require('../models/User')
const { InvalidBody } = require('../errors/index')

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
        res.json({ "email": email, "name": name})
    },  

    async updateProfile( req, res, next){
        const email = res.user.email
        try{
            const { newName, newPassword } = req.body
            if(!email || !newName || !newPassword) {
                throw new InvalidBody()
            }
        } catch(error) {next(error)}
        
    }


    // async updatePassword(req, res, next) {
    //     const email = res.user.email
    //     try {
    //         const { newPassword } = req.body
    //         if (!email || !newPassword) {
    //             throw new InvalidBody()
    //         } else {
    //             const newPassHash = bcrypt.hashSync(newPassword, 10)
    //             const newPass = await User.findOne({ where: { email } })
    //             newPass.password = newPassHash
    //             await newPass.save()
    //             res.send({ msn: "Password updated successfully!" })
    //         }
    //     } catch (error) { next(error) }
}