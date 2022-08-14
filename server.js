const express = require('express')
const PORT = process.openStdin.PORT || 8080
const usersRoute = require('./routes/usersRoute')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

app.use('/users', usersRoute)


app.listen(PORT, ()=>{
    console.log('listening' + PORT)
})