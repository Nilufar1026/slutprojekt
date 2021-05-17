const express = require('express')
const Routes = express.Router()

const usersController = require('../controllers/usersController')
const tasksController = require('../controllers/tasksController')
const messagesController = require('../controllers/messagesController')
const Auth = require('../middlewares/auth')

// Users endpoints

Routes.post('/login', usersController.login)
Routes.get('/me', Auth.user, usersController.me)
Routes.patch('/me', Auth.user, usersController.updateUserProfile)
Routes.get('/users', Auth.user, usersController.getAllUsers)
Routes.get('/users/:id', Auth.user, usersController.getUserById)

// Admin endpoints

Routes.post('/users', Auth.admin, usersController.create)
Routes.patch('/users/:id', Auth.admin, usersController.updateUserById)  //Uppdaterar användaren
Routes.delete('/users/:id', Auth.admin, usersController.deleteUserById)  //Tar bort en användare
Routes.delete('/tasks/:id', Auth.admin, tasksController.deleteTaskById) //Raderar ett är

// Worker endpoints

Routes.post('/tasks', Auth.worker, tasksController.create) //Skapar ett nytt ärende
Routes.post('/tasks/:id/image', Auth.worker, tasksController.addImage) //Laddar upp en bild på ärendet
Routes.get('/tasks', Auth.worker, tasksController.getTaskByClientName)
Routes.patch('/tasks/:id', Auth.worker, tasksController.updateTaskById)  //Uppdaterar ett ärende


// Client endpoints

Routes.get('/tasks/client', Auth.user, tasksController.getTask)

// Client and worker

Routes.get('/tasks/:id', Auth.user, tasksController.getTaskById)  //Hämtar ett ärende
Routes.post('/tasks/:id/messages', Auth.user, messagesController.createMessage)
Routes.get('/tasks/:id/messages', Auth.user, messagesController.getMessageFromTask)
Routes.delete('/messages/:msg_id', Auth.user, messagesController.deleteMessage)

module.exports = Routes