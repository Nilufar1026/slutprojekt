const express = require('express')
const generalRoutes = require('./routes/general')
require('dotenv').config()


const adminRoutes = require('./routes/admin')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())


app.use(generalRoutes)
app.use(adminRoutes)



app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
})