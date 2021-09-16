const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const Database = require('../lib/Database')
const QuoteModel = require('../models/quote.model')
const AuthorModel = require('../models/author.model')
const Author = require('../lib/Author')

/**
 * The dataset
 */

const authors = [
  // {
  //   fullName: 'Aldus Huxley',
  //   firstName: 'Aldus',
  //   middleName: 'Leonard',
  //   lastName: 'Huxley',
  //   born: '1894-07-26T00:00:00.000Z',
  //   died: '1963-11-22T00:00:00.000Z',
  //   profession: 'Author',
  //   bio: 'Aldus Leonard Huxley was an English writer and philosopher. He wrote nearly 50 books—both novels and non-fiction works—as well as wide-ranging essays, narratives, and poems.',
  //   reference: 'https://en.wikipedia.org/wiki/Aldous_Huxley',
  //   imageURL: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Aldous_Huxley_psychical_researcher.png',
  // },
  {
    id: '614337dd2c6b2904dbc5867a',
    fullName: 'Johann Wolfgang von Goethe',
    firstName: 'Johann',
    middleName: 'Wolfgang',
    lastName: 'von Goethe',
    born: '1749-07-28T00:00:00.000Z',
    died: '1832-03-22T00:00:00.000Z',
    profession: 'Philosopher, Scientist, Statesman',
    bio: 'Johann Wolfgang von Goethe was a German poet, playwright, novelist, scientist, statesman, theatre director, and critic.[3] His works include plays, poetry, literature and aesthetic criticism, and treatises on botany, anatomy, and colour. He is considered to be the greatest German literary figure of the modern era.',
    reference: 'https://en.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe',
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Goethe_%28Stieler_1828%29.jpg/220px-Goethe_%28Stieler_1828%29.jpg',
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
  // {
  //   text: `It seems to me that the nature of the ultimate revolution with which we are now faced is precisely this:
  //   That we are in the process of developing a whole series of techniques which will enable the controlling oligarchy who 
  //   have always existed and will always exist to get people to love their servitude.`,
  //   author: 'Aldus Huxley',
  //   citation: 'Lecture at U.C. Berkeley. March 20, 1962',
  //   source: 'https://www.youtube.com/watch?v=aPkQ57cXrPA',
  //   tags: ['distopia'],
  //   likes: 1,
  //   dislikes: 0,
  // },
  {
    id: '614337dd2c6b2904dbc5867b',
    text: 'None are more hopelessly enslaved than those who falsely beleive they are free.',
    author: 'Johann Wolfgang von Goethe',
    citation: 'https://www.brainyquote.com/quotes/johann_wolfgang_von_goeth_134023',
    source: 'https://www.youtube.com/watch?v=aPkQ57cXrPA',
    tags: ['distopia', 'freedom'],
    likes: 1,
    dislikes: 0,
  },
]

main()

async function main() {
  try {
    const database = new Database(process.env.DB_CONNECTION_STRING)
    await database.connect()
    await upsertAuthors(authors)
    await upsertQuotes(quotes)
    await database.disconnect()
    console.log('DONE !')
  } catch (error) {
    console.error(error)
  }
}

async function upsertAuthors(dataset) {
  for (let datapoint of dataset) {
    const found = await AuthorModel.findOne({ fullName: datapoint.fullName }).exec()
    if(found) {
      await updateAuthor(found, datapoint)
    } else {
      await createAuthor(datapoint)
    }
  }
}

async function createAuthor(datapoint) {
  try {
    const body = AuthorModel.parseInput(datapoint)
    const author = new AuthorModel(body)
    const data = await author.save()
    console.log(`created new author ${author.fullName}, id=${author._id}`)
  } catch (error) {
    console.log(`failed to create author: ${error}`)
  }
}

async function updateAuthor(found, datapoint) {
  try {
    const body = AuthorModel.parseInput(datapoint)
    found.patch(body)
    const updated = await found.save()
    console.log(`updated author ${updated.fullName}, id=${updated._id}`)
  } catch (error) {
    console.log(`failed to update author ${id}: ${error}`)
  }
}

async function upsertQuotes(dataset) {
  for (let datapoint of dataset) {
    const author = await AuthorModel.findOne({ fullName: datapoint.author }).exec()
    if (!author) {
      console.log(`The associated author (${datapoint.author}) is not in the database.`)
      continue
    }
    datapoint.author = author._id

    const found = await QuoteModel.findOne({ text: datapoint.text }).exec()
    if(found) {
      await updateQuote(found, datapoint)
    } else {
      await createQuote(datapoint)
    }
  }
}

async function createQuote(datapoint) {
  try {
    const body = QuoteModel.parseInput(datapoint)
    const quote = new QuoteModel(body)
    const data = await quote.save()
    console.log(`loaded quote "${quote.text}" id=${quote._id}`)
  } catch (error) {
    console.log(`failed to load document: ${error}`)
  }
}

async function updateQuote(found, datapoint) {
  try {
    const body = QuoteModel.parseInput(datapoint)
    found.patch(body)
    const updated = await found.save()
    console.log(`updated quote id=${updated._id}`)
  } catch (error) {
    console.log(`failed to update quote ${found._id}: ${error}`)
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