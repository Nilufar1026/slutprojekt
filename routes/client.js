const express = require('express')
const Routes = express.Router()
const clientControl = require('../controllers/clientController')
const Auth = require('../middlewares/auth')

Routes.get('/tasks', Auth.user, clientControl.getTask)
Routes.get('/tasks/:id', Auth.user, clientControl.getTaskById)
Routes.get('/tasks/:id/messages', Auth.user, clientControl.getMessageFromTask)
Routes.post('/tasks/:id/messages', Auth.user, clientControl.createMessage)
Routes.delete('/messages/:msg_id', Auth.user, clientControl.deleteMessage)

module.exports = Routes