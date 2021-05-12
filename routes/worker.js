const express = require('express')
const router = express.Router()

const workerController = require('../controllers/workerController')
const messagesController = require('../controllers/messageController')
const Auth = require('../middlewares/auth')


router.post('/tasks', Auth.worker, workerController.create) //Skapar ett nytt ärende

router.post('/tasks/:id/image', Auth.worker, workerController.addImage) //Laddar upp en bild på ärendet

// router.get('/tasks',Auth.worker,workerController.getTaskByClientName) 
//Hämtar arbetarens ärenden.
// Query params:
// filter all | done
// search Searches tasks using the clients’ name

// router.get('/tasks/:id',Auth.worker,workerController.getTaskById)  //Hämtar ett ärende
// router.patch('/tasks/:id',Auth.worker,workerController.updateTaskById)  //Uppdaterar ett ärende
router.get('/tasks/:id/messages',Auth.worker,messagesController.getMessageFromTask)  //Hämtar alla meddelanden kopplade till ärendet,paginerat och sorterat efter tid.
router.post('/tasks/:id/messages',Auth.worker,messagesController.createMessage) //Skapar ett nytt meddelande på ärendet
router.delete('/messages/:msg_id',Auth.worker,messagesController.deleteMessage)  //Raderar ett meddelande







module.exports = router









