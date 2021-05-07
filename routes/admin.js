const express = require('express')
const router = express.Router()

const adminController=require('../controllers/adminController')
const Auth=require('../middlewares/auth')


router.post('/users',Auth.admin,adminController.create) 
router.patch('/users/:id',Auth.admin,adminController.updateUserById)  //Uppdaterar användaren
router.delete('/users/:id',Auth.admin,adminController.deleteUserById)  //Tar bort en användare
// router.delete('/tasks/:id',Auth.admin,adminController.deleteTaskById) //Raderar ett ärende



module.exports=router