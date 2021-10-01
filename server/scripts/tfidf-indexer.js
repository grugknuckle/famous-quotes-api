const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const Database = require('../lib/Database')
const QuoteModel = require('../models/quote.model')
const Indexer = require('./../lib/Indexer')

main()

async function main() {
  try {
    // open DB, read all quotes, and disconnect
    const database = new Database(process.env.DB_CONNECTION_STRING)
    await database.connect()
    const quotes = await getAllQuotes()
    await database.disconnect()

    // console.log(quotes)
    const indexer = new Indexer({ corpus: quotes.docs, stemmer: 'lancaster' })
    const filename = path.join(__dirname, './../backup/TfIdf.json')
   
    const data = { corpus: indexer.corpus, tfidf: indexer.tfidf }
    const response = await jsonfile.writeFile(filename, data, { spaces: 2 })

    console.log('DONE !')
  } catch (error) {
    console.error(error)
  }
}

async function getAllQuotes() {
  const filter = {}
  const options = {
    page: 1,
    limit: 250,
    sort: 'author'
  }

  const found = await QuoteModel.paginate(filter, options)
  found.docs = found.docs.map(document => document.format())
  return found
}
