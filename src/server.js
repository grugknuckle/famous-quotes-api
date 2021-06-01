const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env.test') })
// require('dotenv').config({ path: path.join(__dirname, '../.env') })
const express = require('express')
const Database = require('./lib/Database.js')
const routes = require('./routes')

startup()

/**
 * Startup the server
 */
async function startup() {
  // start the Express app
  const app = express()
  const port = process.env.PORT || 5000

  app.use(express.json())
  routes.initialize(app)
  
  // connect to database
  const database = new Database(process.env.DB_CONNECTION_STRING)
  await database.connect()
  
  // gracefully handle shutdown
  process.on('SIGTERM', async () => { await shutdown(database) })
  process.on('SIGUSR2', async () => { await shutdown(database) })

  // listen to requests
  app.listen(port, () => {
    console.log(`Express.js server is running on port: ${port}`)
  })

}

/**
 * Gracefully stop the server
 */
async function shutdown(database) {
  try {
    console.log(`Initiate graceful shutdown ...`)
    await database.disconnect()
    console.log('Shutdown complete.')
  } catch (error) {
    console.log('Graceful shutdown wasn\'t graceful ...')
    console.error(error)
  }
  process.kill(process.pid, 'SIGUSR2')
  process.exit()
}

module.exports = {
  startup,
  shutdown
}