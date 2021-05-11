const express = require('express')
const router = express.Router()

const workerController=require('../controllers/workerController')
const Auth=require('../middlewares/auth')


router.post('/tasks',Auth.worker,workerController.create) //Skapar ett nytt ärende

router.post('/tasks/:id/image',Auth.worker,workerController.addImage) //Laddar upp en bild på ärendet

// router.get('/tasks',Auth.worker,workerController.getTaskByClientName) 
//Hämtar arbetarens ärenden.
// Query params:
// filter all | done
// search Searches tasks using the clients’ name

// router.get('/tasks/:id',Auth.worker,workerController.getTaskById)  //Hämtar ett ärende
// router.patch('/tasks/:id',Auth.worker,workerController.updateTaskById)  //Uppdaterar ett ärende
// router.get('/tasks/:id/message',Auth.worker,workerController.getTaskById)  //Hämtar alla meddelanden kopplade till ärendet,paginerat och sorterat efter tid.
// router.post('/tasks/:id/message',Auth.worker,workerController.create) //Skapar ett nytt meddelande på ärendet
// router.delete('/tasks/:id/message',Auth.worker,workerController.deleteUserById)  //Raderar ett meddelande







module.exports=router









