const mongoose = require('mongoose')
const DB = process.env.DATABASE

mongoose.connect(DB)
.then(() => console.log('Connected Successfully')).catch(() => console.log('Connection Failed'))
