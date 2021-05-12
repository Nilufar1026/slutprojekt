const express = require('express')
const Router = express.Router()

const adminController = require('../controllers/adminController')
const workerController = require('../controllers/workerController')
const messagesController = require('../controllers/messageController')
const clientController = require('../controllers/clientController')
const generalControl = require('../controllers/generalController')


const Auth = require('../middlewares/auth')