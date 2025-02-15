const express = require('express')
const app = express()


const PORT = 3000;

require('./DBConn/conn');

app.get('/', (req, res) => {
    res.send('Hello World hello !')
})

app.listen(PORT, () => {
    console.log("Server is running on port 3000 ")
})