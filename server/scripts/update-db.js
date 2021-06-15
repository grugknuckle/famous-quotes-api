const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const Database = require('../lib/Database')
const QuoteModel = require('../models/quote.model')
const AuthorModel = require('../models/author.model')

main()

async function main() {
  const database = new Database(process.env.DB_CONNECTION_STRING)
  await database.connect()

  await updateAuthors()
  // await updateQuotes()

  await database.disconnect()
  console.log('DONE !')
}

async function updateAuthors() {
  const dataset = require(`./../backup/authors.json`)
  console.log(`preparing to load ${dataset.length} ${AuthorModel.name} documents from the authors.json dataset ...`)

  for (let datapoint of dataset) {
    const id = datapoint.id
    try {
      
      const found = AuthorModel.findById(id)
      if(!found) {
        // add a new one?
        continue
      }
      
      const body = AuthorModel.parseInput(datapoint)
      AuthorModel.updateOne({ _id: id }, body)
      const updated = await found.save()
      console.log(`updated author ${updated.fullName}, id=${updated._id}`)
    } catch (error) {
      console.log(`failed to update document ${id}: ${error}`)
    }
  }
}


async function updateQuotes() {
  const dataset = require(`./../backup/quotes.json`)
  console.log(`preparing to load ${dataset.length} ${QuoteModel.name} documents from the quotes.json dataset ...`)

  for (let datapoint of dataset) {
    try {
      // const author = await AuthorModel.findOne({ fullName: datapoint.author }).exec()
      // datapoint.author = author._id
      // let body = QuoteModel.parseInput(datapoint)
      // const quote = new QuoteModel(body)
      // const data = await quote.save()
      console.log(`updated quote "${quote.text}" id=${quote._id}`)
    } catch (error) {
      console.log(`failed to update document: ${error}`)
    }
  }
}