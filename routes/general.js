const express = require('express')
const Routes = express.Router()
const generalControl = require('../controllers/generalController')
const Auth = require('../middlewares/auth')

Routes.post('/login', generalControl.login)
Routes.get('/me', Auth.user, generalControl.me)
Routes.patch('/me', Auth.user, generalControl.update)

module.exports = Routes
  