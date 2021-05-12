const express = require('express')
require('dotenv').config()
const fileUpload = require('express-fileupload');

const generalRoutes = require('./routes/general')
const adminRoutes = require('./routes/admin')
const workerRoutes = require('./routes/worker')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(fileUpload());

app.use(generalRoutes)
app.use(adminRoutes)
app.use(workerRoutes)


app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
})