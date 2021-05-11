const express = require('express')
const Routes = express.Router()
const clientControl = require('../controllers/clientController')
const Auth = require('../middlewares/auth')


Routes.get('/task', Auth.user, clientControl.getTask)
Routes.get('/tasks/:id', Auth.user, clientControl.getTaskById)
Routes.get('/tasks/:id/messages', Auth.user, clientControl.getMessage)
Routes.post('/tasks/:id/messages', Auth.user, clientControl.newMessage)
Routes.delete('/tasks/:id/messages', Auth.user, clientControl.deleteMessage)