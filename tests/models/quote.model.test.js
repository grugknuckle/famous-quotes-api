const mongoose = require('mongoose')
const mongoDB = 'mongodb://127.0.0.1/test_database'
mongoose.connect(mongoDB)

const QuoteModel = require('./../../../server/models/quote.model')
const sample = {
  text: 'You can fool all the people some of the time, and some of the people all the time, but you cannot fool all the people all the time.',
  author: 'Abraham Lincoln',
  citation: '"Abraham Lincoln Quotes." BrainyQuote.com. BrainyMedia Inc, 2021. 1 March 2021. https://www.brainyquote.com/quotes/abraham_lincoln_110340',
  source: 'https://www.brainyquote.com/quotes/abraham_lincoln_110340',
  tags: [],
  likes: 0,
  dislikes: 0
}


describe('The Quote Model ...', () => {

  beforeAll(async () => {
    await QuoteModel.remove({})
  })
  afterEach(async () => {
    await QuoteModel.remove({})
  })
  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('has a QuoteModel module', () => {
    expect(QuoteModel).toBeDefined()
  })

  describe('QuoteModel.findOne', () => {
    it('gets a Quote from query', async () => {
      const quote = new QuoteModel(sample)
      await quote.save()

      const found = await QuoteModel.findOne({ author: sample.author })
      const expected = sample.author
      const actual = found.author
      expect(actual).toEqual(expected)
    })
  })

  describe('QuoteModel.save', () => {
    it('saves a quote', async () => {
      const quote = new QuoteModel(sample)
      const savedQuote = await quote.save()
      const expected = sample.author
      const actual  = savedQuote.author
      expect(actual).toEqual(expected)
    })
  })

  describe('QuoteModel.update', () => {
    it('updates a quote', async () => {
      const quote = new QuoteModel(sample)
      await quote.save()

      const expected = 'Super Dude'
      quote.author = expected
      const updatedQuote = await quote.save()

      const actual  = updatedQuote.author
      expect(actual).toEqual(expected)
    })
  })

})
