const express = require('express')
const router = express.Router()

const workerController=require('../controllers/workerController')
const Auth=require('../middlewares/auth')


router.post('/tasks',Auth.worker,workerController.create) 

router.post('/tasks/:id/image',Auth.worker,workerController.addImage) 

router.patch('/tasks/:id',Auth.worker,workerController.updateTaskById)  

router.get('/tasks',Auth.worker,workerController.getTaskByClientName) 

router.get('/tasks/:id',Auth.worker,workerController.getTaskById)  









module.exports=router









