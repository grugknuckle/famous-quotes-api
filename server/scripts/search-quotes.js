const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const Indexer = require('./../lib/TfIdf')
const Database = require('../lib/Database')
const QuoteModel = require('../models/quote.model')
const AuthorModel = require('../models/author.model')

const args = process.argv.slice(2)
const searchString = args.length ? args[0] : 'war fighter'

main()

async function main() {
  
  try {
    const database = new Database(process.env.DB_CONNECTION_STRING)
    await database.connect()

    const quotes = await getAllQuotes()
    const indexer = new Indexer(quotes.docs)

    console.log(`searching for "${searchString}".`)
    console.log(`search string stems: ${indexer.tokenizeAndStem(searchString)}`)

    const results = indexer.rankDocuments(searchString)

    // const results = []
    // let found = await rankQuotes()
    
    // for (const item of found) {
    //   const quote = await findQuoteByID(item.id)
    //   results.push(Object.assign(item, { text: quote.text, author: quote.author.fullName }))
    // }

    console.log(results)
    await database.disconnect()
    console.log('DONE !')
  } catch (error) {
    console.error(error)
  }
}

async function rankQuotes() {
  const tokenizer = new natural.WordTokenizer()
  const filename = path.join(__dirname, './../backup/TfIdf.json')
  
  const index = await jsonfile.readFile(filename)
  const TfIdf = natural.TfIdf
  const tfidf = new TfIdf(index.tfidf)

  const results = []
  // tokenize and stem the search string (ENGLISH ONLY !)
  const stems = tokenizer
    .tokenize(searchString)
    .map(token => natural.LancasterStemmer.stem(token))

  // compute the measures
  tfidf.tfidfs(stems, (i, measure) => {
    if (measure > 0) {
      const id = index.lookup[i]
      const result = { measure, id }
      results.push(result)
    }
  })
  return results.sort((a, b) => b.measure - a.measure)
}

async function getAllQuotes() {
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

async function findQuoteByID(id) {
  const found = await QuoteModel.findById(id).populate({ path: 'author' })
  const quote = found ? found.format() :  {}
  return quote
}