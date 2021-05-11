const User = require('../models/User')
const Task = require('../models/Tasks')
const bcrypt = require('bcryptjs')
require('dotenv').config()


const admin1 = process.env.ADMIN1
const newAdminPass1 = bcrypt.hashSync(admin1, 10)

const admin2 = process.env.ADMIN2
const newAdminPass2 = bcrypt.hashSync(admin2, 10)

const worker1 = process.env.WORKER1
const newWorkerPass1 = bcrypt.hashSync(worker1, 10)

const worker2 = process.env.WORKER2
const newWorkerPass2 = bcrypt.hashSync(worker2, 10)

const client1 = process.env.CLIENT1
const newClientPass1 = bcrypt.hashSync(client1, 10)

const client2 = process.env.CLIENT2
const newClientPass2 = bcrypt.hashSync(client2, 10)



User.create({email:'admin1@email.com', name: 'Ad Min1', password:newAdminPass1, role: 'admin'})
User.create({email:'admin2@email.com', name: 'Ad Min2', password:newAdminPass2, role: 'admin'})
User.create({email:'worker1@email.com', name: 'worker 1', password:newWorkerPass1, role: 'worker'})
User.create({email:'worker2@email.com', name: 'worker 2', password:newWorkerPass2, role: 'worker'})
User.create({email:'client1@email.com', name: 'client 1', password:newClientPass1, role: 'client'})
User.create({email:'client2@email.com', name: 'client 2', password:newClientPass2, role: 'client'})

Task.create({taskName:'Odla odling', clientId: 5})



