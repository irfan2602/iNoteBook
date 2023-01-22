const dotenv = require('dotenv')
const express = require('express')
const app = express()
const cors = require('cors')
dotenv.config({path: './config.env'})
require('./db/connection')
const port = process.env.PORT

app.use(express.json())
app.use(cors())

app.get('/', (req,res) =>{
    res.send(`Hello Irfan`)
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () =>{
    console.log(`Server is running at port ${port} `)
})