const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const Indexer = require('./../lib/TfIdf')
const Database = require('../lib/Database')
const QuoteModel = require('../models/quote.model')

const args = process.argv.slice(2)
const searchString = args.length ? args[0] : 'war fighter'

main()

async function main () {
  try {
    const database = new Database(process.env.DB_CONNECTION_STRING)
    await database.connect()

    const quotes = await getAllQuotes()
    const indexer = new Indexer(quotes.docs)

    console.log(`searching for "${searchString}".`)
    console.log(`search string stems: ${indexer.tokenizeAndStem(searchString)}`)

    const results = indexer.rankDocuments(searchString)

    console.log(results)
    await database.disconnect()
    console.log('DONE !')
  } catch (error) {
    console.error(error)
  }
}

async function getAllQuotes () {
  const query = {
    page: 1,
    limit: 250,
    sort: 'author'
  }

  const { filter, options } = QuoteModel.parseQuery(query)
  const found = await QuoteModel.paginate(filter, options)
  found.docs = found.docs.map(document => document.format())
  return found
}
