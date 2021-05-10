const express = require('express')
const Routes = express.Router()
const clientControl = require('../controllers/clientController')
const Auth = require('../middlewares/auth')

Routes.get('/task', Auth.user, clientControl.getTask)

module.exports = Routes