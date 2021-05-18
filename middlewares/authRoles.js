const { Unauthorized, Forbidden} = require('../errors/index')

// const role = res.user.role

module.exports = {
    
    // authRoles: ( req, res, next ) => {
    //     const role = res.user.role
    //     return role
    //     next()
    // },

    authWorkerAndClient: (req, res, next) =>{
        const role = res.user.role
        if(role === 'worker' || role === 'client'){next()}
        else{ throw new Unauthorized()}
    },

    authClient: (req, res, next) =>{
        const role = res.user.role
        if(role === 'client'){next()}
        else{ throw new Unauthorized()}
    }

    
}