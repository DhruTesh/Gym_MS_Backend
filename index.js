const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
require ('dotenv').config()


const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
require('./DBConn/conn');

const GymRoutes = require('./Routes/gym');
const MembershipRoutes = require('./Routes/membership');
const MemberRoutes = require('./Routes/member');

app.use('/auth',GymRoutes)
app.use('/plans',MembershipRoutes)
app.use('/members',MemberRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port 3000 ")
})