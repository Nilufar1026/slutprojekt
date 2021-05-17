const express = require('express')
const Routes = express.Router()

// const adminController = require('../controllers/adminController')
// const workerController = require('../controllers/workerController')
// const messagesController = require('../controllers/messageController')
// const clientController = require('../controllers/clientController')

const usersController = require('../controllers/usersController')
// const tasksController = require('../controllers/tasksController')


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
// Routes.delete('/tasks/:id', Auth.admin, tasksController.deleteTaskById) //Raderar ett är

// Worker endpoints

// Routes.post('/tasks', Auth.worker, workerController.create) //Skapar ett nytt ärende
// Routes.post('/tasks/:id/image', Auth.worker, workerController.addImage) //Laddar upp en bild på ärendet
// Routes.get('/tasks', Auth.worker, workerController.getTaskByClientName)
// // Routes.get('/tasks/:id',Auth.worker,workerController.getTaskById)  //Hämtar ett ärende
// // Routes.patch('/tasks/:id',Auth.worker,workerController.updateTaskById)  //Uppdaterar ett ärende
// Routes.get('/tasks/:id/messages', Auth.worker, messagesController.getMessageFromTask)  //Hämtar alla meddelanden kopplade till ärendet,paginerat och sorterat efter tid.
// Routes.post('/tasks/:id/messages', Auth.worker, messagesController.createMessage) //Skapar ett nytt meddelande på ärendet
// Routes.delete('/messages/:msg_id', Auth.worker, messagesController.deleteMessage)  //Raderar ett meddelande


// // Client endpoints

// Routes.get('/tasks', Auth.user, clientController.getTask)
// Routes.get('/tasks/:id', Auth.user, clientController.getTaskById)
// Routes.get('/tasks/:id/messages', Auth.user, clientController.getMessageFromTask)
// Routes.post('/tasks/:id/messages', Auth.user, clientController.createMessage)
// Routes.delete('/messages/:msg_id', Auth.user, clientController.deleteMessage)

// Routes.get('/tasks', Auth.user, tasksController.getTask)
// Routes.get('/tasks/:id', Auth.user, tasksController.getTaskById)


// Client and worker

// Routes.get('/tasks/:id/messages', Auth.user, messagesController.getMessageFromTask)
// Routes.post('/tasks/:id/messages', Auth.user, messagesController.createMessage)
// Routes.delete('/messages/:msg_id', Auth.user, messagesController.deleteMessage)

module.exports = Routes