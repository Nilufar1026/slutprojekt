const express = require('express')
const Routes = express.Router()
const generalControl = require('../controllers/generalController')
const Auth = require('../middlewares/auth')

Routes.post('/authenticate', generalControl.auth)
Routes.get('/me', Auth.user, generalControl.me)
// Routes.patch('/me', Auth.user, generalControl.updateProfile)

module.exports = Routes
  