const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '', // no password atm tho you might have to write 'no password'
    database: 'mydb'
})

//app.use(express.json())
app.use(cors())

app.listen(3001, () => {
    console.log('server works')
})