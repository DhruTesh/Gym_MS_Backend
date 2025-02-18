const express = require('express')
const app = express()
require ('dotenv').config()


const PORT = process.env.PORT;

app.use(express.json());
require('./DBConn/conn');

const GymRoutes = require('./Routes/gym');

app.use('/auth',GymRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port 3000 ")
})