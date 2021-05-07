const express = require('express')
const router = express.Router()

const adminController=require('../controllers/workerController')
const Auth=require('../middlewares/auth')


router.post('/tasks',Auth.worker,adminController.create) //Skapar ett nytt ärende
router.get('/tasks',Auth.worker,adminController.create) 
//Hämtar arbetarens ärenden.
// Query params:
// filter all | done
// search Searches tasks using the clients’ name

router.get('/tasks/:id',Auth.worker,adminController.getTaskById)  //Hämtar ett ärende
router.patch('/tasks/:id',Auth.worker,adminController.updateTaskById)  //Uppdaterar ett ärende
router.get('/tasks/:id/message',Auth.worker,adminController.getTaskById)  //Hämtar alla meddelanden kopplade till ärendet,paginerat och sorterat efter tid.
router.post('/tasks/:id/message',Auth.worker,adminController.create) //Skapar ett nytt meddelande på ärendet
router.delete('/tasks/:id/message',Auth.worker,adminController.deleteUserById)  //Raderar ett meddelande
router.post('/tasks/:id/image',Auth.worker,adminController.create) //Laddar upp en bild på ärendet



module.exports=router









