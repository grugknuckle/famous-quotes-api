// const mongoose = require('mongoose')
// const mongoDB = 'mongodb://127.0.0.1/test_database'
// mongoose.connect(mongoDB)

const Service = require('../../../src/lib/Service')
const Quote = require('../../src/lib/Quote')

const sample = {
  text: 'You can fool all the people some of the time, and some of the people all the time, but you cannot fool all the people all the time.',
  author: 'Abraham Lincoln',
  citation: '"Abraham Lincoln Quotes." BrainyQuote.com. BrainyMedia Inc, 2021. 1 March 2021. https://www.brainyquote.com/quotes/abraham_lincoln_110340',
  source: 'https://www.brainyquote.com/quotes/abraham_lincoln_110340',
  tags: [],
  likes: 0,
  dislikes: 0
}

const mockModel = {
  parseQuery: Quote.parseQuery,
  parseInput: Quote.parseInput,
  jsonSchema: Quote.jsonSchema,
  paginate: jest.fn(),
  
}

describe('Service class ...', () => {

  it('is defined', () => {
    expect(Service).toBeDefined()
  })

  describe('constructor', () => {
    it.todo('it accepts the model as an input parameter')
    it.todo('it sets this._model to the input parameter')
  })

  describe('instance methods', () => {
    let service
    beforeEach(() => {
      service = new Service(mockModel)
    })

    it('The Service is instantiated', () => {
      expect(service).toBeDefined()
      expect(service).toBeInstanceOf(Service)
    })

    describe('the model property', () => {
      it('is defined and is not static', () => {
        console.log(service.model)
        expect(service.model).toBeDefined()
        expect(Service.model).not.toBeDefined()
      })
      it('returns the parameter input to the class constructor', () => {
        expect(service.model).toEqual(mockModel)
      })
    })

    describe('search', () => {
      it('is defined and is NOT static', () => {
        expect(service.search).toBeDefined()
        expect(service.search).toBeInstanceOf(Function)
        expect(Service.search).not.toBeDefined()
      })
      it('is an async function', () => {
        expect(service.search.constructor.name).toBe('AsyncFunction')
      })
    })

    describe('findById', () => {
      it('is defined and is NOT static', () => {
        expect(service.findById).toBeDefined()
        expect(service.findById).toBeInstanceOf(Function)
        expect(Service.findById).not.toBeDefined()
      })
      it('is an async function', () => {
        expect(service.findById.constructor.name).toBe('AsyncFunction')
      })
    })

    describe('create', () => {
      it('is defined and is NOT static', () => {
        expect(service.create).toBeDefined()
        expect(service.create).toBeInstanceOf(Function)
        expect(Service.create).not.toBeDefined()
      })
      it('is an async function', () => {
        expect(service.create.constructor.name).toBe('AsyncFunction')
      })
    })

    describe('update', () => {
      it('is defined and is NOT static', () => {
        expect(service.update).toBeDefined()
        expect(service.update).toBeInstanceOf(Function)
        expect(Service.update).not.toBeDefined()
      })
      it('is an async function', () => {
        expect(service.update.constructor.name).toBe('AsyncFunction')
      })
    })

    describe('remove', () => {
      it('is defined and is NOT static', () => {
        expect(service.remove).toBeDefined()
        expect(service.remove).toBeInstanceOf(Function)
        expect(Service.remove).not.toBeDefined()
      })
      it('is an async function', () => {
        expect(service.remove.constructor.name).toBe('AsyncFunction')
      })
    })
  })
})