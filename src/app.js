const express = require('express')
const routes = require('./routes')

const app = express()
app.use(express.json())
routes.initialize(app)

module.exports = app