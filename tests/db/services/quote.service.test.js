// const mongoose = require('mongoose')
// const mongoDB = 'mongodb://127.0.0.1/test_database'
// mongoose.connect(mongoDB)

const QuoteService = require('../../../src/database/services/quote.service')
const QuoteModel = require('./../../../src/database/models/quote.model')

const sample = {
  text: 'You can fool all the people some of the time, and some of the people all the time, but you cannot fool all the people all the time.',
  author: 'Abraham Lincoln',
  citation: '"Abraham Lincoln Quotes." BrainyQuote.com. BrainyMedia Inc, 2021. 1 March 2021. https://www.brainyquote.com/quotes/abraham_lincoln_110340',
  source: 'https://www.brainyquote.com/quotes/abraham_lincoln_110340',
  tags: [],
  likes: 0,
  dislikes: 0
}

describe('QuoteService class ...', () => {

  it('is defined', () => {
    expect(QuoteService).toBeDefined()
  })

  describe('constructor', () => {
    it.todo('it accepts the model as an input parameter')
    it.todo('it sets this._model to the input parameter')
  })

  describe('instance methods', () => {
    let service = new QuoteService(QuoteModel)
    beforeAll(() => {})

    it('The QuoteService is instantiated', () => {
      expect(service).toBeDefined()
      expect(service).toBeInstanceOf(QuoteService)
    })

    describe('the model property', () => {
      it('is defined and is not static', () => {
        console.log(service.model)
        expect(service.model).toBeDefined()
        expect(QuoteService.model).not.toBeDefined()
      })
      it('returns the parameter input to the class constructor', () => {
        expect(service.model).toEqual(QuoteModel)
      })
    })

    describe('search', () => {
      it('is defined and is NOT static', () => {
        expect(service.search).toBeDefined()
        expect(service.search).toBeInstanceOf(Function)
        expect(QuoteService.search).not.toBeDefined()
      })
      it('is an async function', () => {
        expect(service.search.constructor.name).toBe('AsyncFunction')
      })
    })

    describe('findById', () => {
      it('is defined and is NOT static', () => {
        expect(service.findById).toBeDefined()
        expect(service.findById).toBeInstanceOf(Function)
        expect(QuoteService.findById).not.toBeDefined()
      })
      it('is an async function', () => {
        expect(service.findById.constructor.name).toBe('AsyncFunction')
      })
    })

    describe('create', () => {
      it('is defined and is NOT static', () => {
        expect(service.create).toBeDefined()
        expect(service.create).toBeInstanceOf(Function)
        expect(QuoteService.create).not.toBeDefined()
      })
      it('is an async function', () => {
        expect(service.create.constructor.name).toBe('AsyncFunction')
      })
    })

    describe('update', () => {
      it('is defined and is NOT static', () => {
        expect(service.update).toBeDefined()
        expect(service.update).toBeInstanceOf(Function)
        expect(QuoteService.update).not.toBeDefined()
      })
      it('is an async function', () => {
        expect(service.update.constructor.name).toBe('AsyncFunction')
      })
    })

    describe('remove', () => {
      it('is defined and is NOT static', () => {
        expect(service.remove).toBeDefined()
        expect(service.remove).toBeInstanceOf(Function)
        expect(QuoteService.remove).not.toBeDefined()
      })
      it('is an async function', () => {
        expect(service.remove.constructor.name).toBe('AsyncFunction')
      })
    })
  })
})