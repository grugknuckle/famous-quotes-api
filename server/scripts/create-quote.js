const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const Database = require('../lib/Database')
const QuoteModel = require('../models/quote.model')
const AuthorModel = require('../models/author.model')

/**
 * The dataset
 */

const authors = [
  {
    fullName: 'Aldus Huxley',
    firstName: 'Aldus',
    middleName: 'Leonard',
    lastName: 'Huxley',
    born: '1894-07-26T00:00:00.000Z',
    died: '1963-11-22T00:00:00.000Z',
    profession: 'Author',
    bio: 'Aldus Leonard Huxley was an English writer and philosopher. He wrote nearly 50 books—both novels and non-fiction works—as well as wide-ranging essays, narratives, and poems.',
    reference: 'https://en.wikipedia.org/wiki/Aldous_Huxley',
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Aldous_Huxley_psychical_researcher.png',
  }
]
const quotes = [
  // {
  //   text: 'If the first half of the twentieth century was the era of the technical engineers, the second half may well be the era of the social engineers - and the twenty-first century, I suppose, will be the era of World Controllers, the scientific caste system and Brave New World.',
  //   author: 'Aldus Huxley',
  //   citation: '\"Brave New World\", ISBN 978-0-06-085052-4.',
  //   source: 'https://www.youtube.com/watch?v=aPkQ57cXrPA',
  //   tags: ['distopia'],
  //   likes: 1,
  //   dislikes: 0,
  // },
  {
    text: `It seems to me that the nature of the ultimate revolution with which we are now faced is precisely this:
    That we are in the process of developing a whole series of techniques which will enable the controlling oligarchy who 
    have always existed and will always exist to get people to love their servitude.`,
    author: 'Aldus Huxley',
    citation: 'Lecture at U.C. Berkeley. March 20, 1962',
    source: 'https://www.youtube.com/watch?v=aPkQ57cXrPA',
    tags: ['distopia'],
    likes: 1,
    dislikes: 0,
  }
]

main()

async function main() {
  const database = new Database(process.env.DB_CONNECTION_STRING)
  try {
    await database.connect()
  } catch (error) {
    throw error
  }

  try {
    // await loadAuthors(authors)
    await loadQuotes(quotes)
  } catch (error) {
    throw error
  }
  
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