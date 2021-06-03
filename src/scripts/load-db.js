const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const Database = require('../lib/Database')
const QuoteModel = require('../database/models/quote.model')
const AuthorModel = require('../database/models/author.model')

main()

async function main() {
  const database = new Database(process.env.DB_CONNECTION_STRING)
  await database.connect()
  await loadData(AuthorModel, 'authors.json')
  await loadData(QuoteModel, 'quotes.json')
  await database.disconnect()
  console.log('DONE !')
}

async function loadData(Model, filename) {
  const dataset = require(`./../database/backup/${filename}`)
  console.log(`preparing to load ${dataset.length} ${Model.name} documents from the ${filename} dataset ...`)
  for (let datapoint of dataset) {
    try {
      const body = Model.parseInput(datapoint)
      const model = new Model(body)
      const data = await model.save()
      console.log(`loaded id=${model._id}`)
    } catch (error) {
      console.log(`failed to load document: ${error}`)
    }
  }
}

