require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()
const port = 5000

app.use(express.json())

routes(app)

const uri = process.env.DB_CONNECTION_STRING

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection

connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})