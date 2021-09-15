const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const Database = require('../lib/Database')
const QuoteModel = require('../models/quote.model')
const AuthorModel = require('../models/author.model')

main()

const authors = require(`./../backup/authors.json`)
const quotes = require(`./../backup/quotes.json`)

async function main() {
  const database = new Database(process.env.DB_CONNECTION_STRING)
  await database.connect()

  await loadAuthors(authors)
  await loadQuotes(quotes)

  await database.disconnect()
  console.log('DONE !')
}

async function loadAuthors(dataset) {
  console.log(`preparing to load ${dataset.length} ${AuthorModel.name} documents from the authors.json dataset ...`)

  for (let datapoint of dataset) {
    try {
      const body = AuthorModel.parseInput(datapoint)
      const author = new AuthorModel(body)
      const data = await author.save()
      console.log(`loaded author ${author.fullName}, id=${author._id}`)
    } catch (error) {
      console.log(`failed to load document: ${error}`)
    }
  }
}

async function loadQuotes(dataset) {
  console.log(`preparing to load ${dataset.length} ${QuoteModel.name} documents from the quotes.json dataset ...`)

  for (let datapoint of dataset) {
    try {
      const author = await AuthorModel.findOne({ fullName: datapoint.author }).exec()
      datapoint.author = author._id
      let body = QuoteModel.parseInput(datapoint)
      const quote = new QuoteModel(body)
      const data = await quote.save()
      console.log(`loaded quote "${quote.text}" id=${quote._id}`)
    } catch (error) {
      console.log(`failed to load document: ${error}`)
    }
  }
}