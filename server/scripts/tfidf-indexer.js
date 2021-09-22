const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const jsonfile = require('jsonfile')
const Database = require('../lib/Database')
const QuoteModel = require('../models/quote.model')

const natural = require('natural')
const sw = require('stopword')
main()

async function main() {
  try {
    // open DB, read all quotes, and disconnect
    const database = new Database(process.env.DB_CONNECTION_STRING)
    await database.connect()
    const quotes = await getAllQuotes()
    await database.disconnect()

    // tokenize quote texts, remove stopwords, add documents to TfIdf corpus
    const corpus = quotes.docs.map(doc => doc.text)
    const lookup = quotes.docs.map(doc => doc.id)
    const tfidf = await indexDocuments(corpus)

    // serialize TfIdf to JSON, save it with a quote-id lookup table.
    const filename = path.join(__dirname, './../backup/TfIdf.json')
    const data = { lookup, tfidf }
    const response = await jsonfile.writeFile(filename, data, { spaces: 2 })

    console.log('DONE !')
  } catch (error) {
    console.error(error)
  }
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

async function indexDocuments(corpus) {
  const TfIdf = natural.TfIdf
  const tfidf = new TfIdf()
  const tokenizer = new natural.WordTokenizer()

  for(const text of corpus) {
    // tokenize quote text and remove stopwords
    const document = sw.removeStopwords(tokenizer.tokenize(text))
    tfidf.addDocument(document)
  }
  return tfidf
}

