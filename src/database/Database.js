const mongoose = require('mongoose')
const database = process.env.DB_CONNECTION_STRING

/**
 * Database class manages connections to the MongoDB database.
 * 
 * @class
 * @property {string} uri The MongoDB connection string.
 * @property {object} connection A mongoose.js connection object.
 */
class Database {
  constructor(uri) {
    // TODO: Error handling on bad inputs to constructor.
    this._uri = uri
    this._connection = null
    // suppress deprecation warning ... see https://github.com/Automattic/mongoose/issues/7108
    mongoose.set('useFindAndModify', false)
  }

  get name() { return this.uri.split('/').pop() }
  get uri() { return this._uri }
  get connection() { return this._connection }

  /**
   * Establish a connection to the database and initialize connection event handlers
   */
  async connect() {
    try {
      console.log(`Connecting to database: ${this.name} ...`)
      await mongoose.connect(this.uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
      const connection = mongoose.connection

      connection.once('connected', () => {
        console.log(`Established connection database: ${this.name}`)
      })
      connection.once('disconnected', () => {
        console.log(`Closed connection to database: ${this.name}`)
      })
      connection.once('error', err => {
        console.log(`Database connection error for ${this.name} database: error ${err}`)
      })
      this._connection = connection
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  /**
   * Close connections to the database
   */
  async disconnect() {
    try {
      console.log(`Disconnecting from database: ${this.name} ...`)
      await this.connection.close()
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
module.exports = Database