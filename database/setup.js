const db = require('./connection')
require('../models/User')
require('../models/Tasks')
require('../models/Messages')

db.sync()