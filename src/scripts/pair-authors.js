const path = require('path')
const jsonfile = require('jsonfile')
// require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const authors = require('./../backup/authors.json')
const quotes = require('./../backup/quotes.json')

main()

async function main() {

  const matchedQuotes = []
  for (let quote of quotes) {
    const author = authors.find(a => a.fullName == quote.author)
    const authorid = author ? author.id : null
    if (authorid) {
      quote.author = authorid
      matchedQuotes.push(quote)
      console.log(`Matched quote.id=${quote.id} to author. (${quote.author}, ${authorid})`)
    } else {
      console.log(`From quote.id=${quote.id} Could not match ${quote.author} to any author on file.`)
    }
  }

  const result = await jsonfile.writeFile(path.join(__dirname, './../backup/quotes-matched.json'), matchedQuotes, { spaces: 2 })
  console.log(result)
}
