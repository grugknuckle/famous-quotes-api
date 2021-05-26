require('dotenv').config()
const express = require('express')
const Database = require('./database/Database.js')
const routes = require('./routes')

startup()

/**
 * Startup the server
 */
async function startup() {
  const app = express()
  const port = process.env.PORT || 5000

  app.use(express.json())
  routes.initialize(app)
  
  const database = new Database(process.env.DB_CONNECTION_STRING)
  await database.connect()

  app.listen(port, () => {
    console.log(`Express.js server is running on port: ${port}`)
  })
}

/**
 * Gracefully stop the server
 */
async function shutdown() {
  // TODO: close connections to Mongo.
}

module.exports = {
  startup,
  shutdown
}