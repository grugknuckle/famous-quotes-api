const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const Database = require('../lib/Database')
const QuoteModel = require('../database/models/quote.model')
const AuthorModel = require('../database/models/author.model')

killEmAll()

async function killEmAll() {
  const database = new Database(process.env.DB_CONNECTION_STRING)
  try {
    await database.connect()

    console.log(`preparing to clear the Quotes collection ...`)
    await QuoteModel.remove({})
    console.log(`Removed all documents from the Quote collection.`)

    console.log(`preparing to clear the Author collection ...`)
    await AuthorModel.remove({})
    console.log(`Removed all documents from the Author collection.`)

  } catch (error) {
    console.log('Something went wrong.')
    console.error(error) 
  }
  await database.disconnect()
  console.log('DONE !')
}