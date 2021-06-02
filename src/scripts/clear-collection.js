const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const Database = require('./../lib/Database')
const QuoteModel = require('./../database/models/quote.model')

killEmAll()

async function killEmAll() {
  const database = new Database(process.env.DB_CONNECTION_STRING)
  try {
    await database.connect()

    console.log(`preparing to clear the Quotes collection ...`)
    const removed = await QuoteModel.remove({})
    console.log(`Removed ${removed.length} documents from the Quote collection.`)
  } catch (error) {
    console.log('Something went wrong.')
    console.error(error) 
  }
  await database.disconnect()
  console.log('DONE !')
}