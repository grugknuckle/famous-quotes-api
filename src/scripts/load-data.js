const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const Database = require('./../lib/Database')
const QuoteModel = require('./../database/models/quote.model')

const dataset = require('./../database/backup/quotes.json')

loadAuthors()
loadQuotes()

async function loadAuthors() {

}

async function loadQuotes() {
  const database = new Database(process.env.DB_CONNECTION_STRING)
  await database.connect()

  console.log(`preparing to load ${dataset.length} quotes from dataset ...`)
  for (let datapoint of dataset) {
    try {
      const body = QuoteModel.parseInput(datapoint)
      const quote = new QuoteModel(body)
      const data = await quote.save()
      console.log(`loaded id=${quote._id}: ${quote.text}`)
    } catch (error) {
      console.log(`failed to load quote: ${error}`)
    }
  }

  await database.disconnect()
  console.log('DONE !')
}

