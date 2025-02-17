const express = require('express')
const app = express()


const PORT = 3000;

app.use(express.json());
require('./DBConn/conn');

const GymRoutes = require('./Routes/gym');

app.use('/auth',GymRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port 3000 ")
})