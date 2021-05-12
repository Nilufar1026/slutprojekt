const express = require('express')
const Routes = express.Router()
const clientControl = require('../controllers/clientController')
const Auth = require('../middlewares/auth')

Routes.get('/tasks', Auth.user, clientControl.getTask)
Routes.get('/tasks/:id', Auth.user, clientControl.getTaskById)

module.exports = Routes