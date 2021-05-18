const User = require('../models/User')
// const { Unauthorized, Forbidden } = require('../errors/index')

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

  admin: (req, res, next) => {
    const token = extractToken(req.headers)
    const user = User.validateToken(token)
    if (user.role !== 'admin') { throw new Forbidden() }
    req.user = user
    next()
  },


  worker: (req, res, next) => {
    const token = extractToken(req.headers)
    const user = User.validateToken(token)
    if (user.role !== 'worker') { throw new Forbidden() }
    req.user = user
    next()
  },


  workerAndClient: (req, res, next) => {
    const token = extractToken(req.headers)
    const user = User.validateToken(token)
    if (user.role === 'admin') { throw new Forbidden() }
    else {
      req.user = user
    }
    next()
  },
}