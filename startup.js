const path = require('path')
const mode = process.argv[2]

switch(mode) {
  case 'dev':
    require('dotenv').config({ path: path.join(__dirname, './.env.dev') })
    break;
  case 'local':
    require('dotenv').config({ path: path.join(__dirname, './.env.local') })
    break
  default:
    require('dotenv').config({ path: path.join(__dirname, './.env.prod') })
}

const app = require('./src/app.js')
const Database = require('./src/lib/Database.js')

startup(app)

/**
 * Startup the server
 */
async function startup(app) {
  // connect to database
  const database = new Database(process.env.DB_CONNECTION_STRING)
  await database.connect()
  
  // gracefully handle shutdown
  process.on('SIGTERM', async () => { await shutdown(database) })
  process.on('SIGUSR2', async () => { await shutdown(database) })

  const port = process.env.PORT || 5000
  // listen to requests
  app.listen(port, () => {
    console.log(`Application started in ${process.env.MODE} mode`)
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