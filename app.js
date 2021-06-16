const express = require('express')
require('dotenv').config()
const fileUpload = require('express-fileupload')

const routes = require('./routes/index')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(fileUpload());

app.use(routes)



app.use(fileUpload())
app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
})