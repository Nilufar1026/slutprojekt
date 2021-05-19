const User = require('../models/User')
const { Unauthorized, Forbidden } = require('../errors/index')


function extractToken(headers) {
  const { authorization } = headers
  if (!authorization) { throw new Unauthorized() }
  const token = authorization.replace('Bearer ', '')
  return token
}

module.exports = {

  user: (req, res, next) => {
    const token = extractToken(req.headers)
    const user = User.validateToken(token)
    res.user = user
    next()
  },

  allowRoles(){
    const roles = Array.from(arguments)
    return (req, res, next) =>{
      // if(!req.user){throw new Unauthorized()}
      const role = res.user.role
      if(!roles.includes(role)){throw new Forbidden()}
      next()
    }
  }

}