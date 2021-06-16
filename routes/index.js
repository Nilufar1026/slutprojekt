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

Routes.post('/users', Auth.user, Auth.allowRoles('admin'), usersController.create)
Routes.patch('/users/:id', Auth.user, Auth.allowRoles('admin'), usersController.updateUserById)  
Routes.delete('/users/:id', Auth.user, Auth.allowRoles('admin'), usersController.deleteUserById)  
Routes.delete('/tasks/:id', Auth.user, Auth.allowRoles('worker'), tasksController.deleteTaskById) 

// Worker endpoints

Routes.post('/tasks',  Auth.user, Auth.allowRoles('worker'), tasksController.create) 
Routes.post('/tasks/:id/image', Auth.user, Auth.allowRoles('worker'), tasksController.addImage) 
Routes.get('/tasks', Auth.user, Auth.allowRoles('worker'), tasksController.getTaskByClientName)
Routes.get('/tasks/worker', Auth.user, Auth.allowRoles('worker'), tasksController.getTaskWorker)
Routes.patch('/tasks/:id', Auth.user, Auth.allowRoles('worker'), tasksController.updateTaskById)  


// // Client endpoints

Routes.get('/tasks/client', Auth.user, Auth.allowRoles('client'), tasksController.getTask)


// // Client and worker

Routes.get('/tasks/:id', Auth.user, Auth.allowRoles('worker','client'), tasksController.getTaskById)  
Routes.post('/tasks/:id/messages', Auth.user, Auth.allowRoles('worker','client'), messagesController.createMessage)
Routes.get('/tasks/:id/messages', Auth.user, Auth.allowRoles('worker','client'), messagesController.getMessageFromTask)
Routes.delete('/messages/:msg_id', Auth.user, Auth.allowRoles('worker','client'), messagesController.deleteMessage)

module.exports = Routes