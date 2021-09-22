const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const jsonfile = require('jsonfile')
const Database = require('../lib/Database')
const QuoteModel = require('../models/quote.model')
const AuthorModel = require('../models/author.model')

const natural = require('natural')

const args = process.argv.slice(2)
const searchString = args.length ? args[0] : 'war fighter'

main()

async function main() {
  console.log(`searching for "${searchString}"."`)
  try {
    const database = new Database(process.env.DB_CONNECTION_STRING)
    await database.connect()

    const results = []
    let found = await rankQuotes()
    
    for (const item of found) {
      const quote = await findQuoteByID(item.id)
      results.push(Object.assign(item, { text: quote.text, author: quote.author.fullName }))
    }

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
  tfidf.tfidfs(tokenizer.tokenize(searchString), (i, measure) => {
    if (measure > 0) {
      const id = index.lookup[i]
      const result = { measure, id }
      results.push(result)
    }
  })
  return results.sort((a, b) => b.measure - a.measure)
}

async function findQuoteByID(id) {
  const found = await QuoteModel.findById(id).populate({ path: 'author' })
  const quote = found ? found.format() :  {}
  return quote
}