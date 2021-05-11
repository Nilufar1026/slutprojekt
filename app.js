const express = require('express')
require('dotenv').config()

const generalRoutes = require('./routes/general')
const adminRoutes = require('./routes/admin')
const workerRoutes = require('./routes/worker')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())


app.use(generalRoutes)
app.use(adminRoutes)
app.use(clientRoutes)

app.use(workerRoutes)


app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
})