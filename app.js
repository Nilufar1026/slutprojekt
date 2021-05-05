const express = require('express')
// const Routes = require('./routes/index')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// app.use(Routes)

app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
})