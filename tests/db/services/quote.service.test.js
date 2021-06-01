const QuoteService = require('../../../src/database/services/quote.service')

const Database = require('./../../../src/lib/Database.js')
const uri = process.env.DB_CONNECTION_STRING
const database = new Database(uri)

describe('QuoteService class ...', () => {

  beforeAll(async () => {
    await database.connect()
  })

  afterAll(async () => {
    await database.disconnect()
  })

  describe('constructor', () => {
    it.todo('it accepts the model as an input parameter')
    it.todo('it sets this._model to the input parameter')
  })

  describe('instance methods', () => {
    let service
    beforeAll(() => {
      service = new QuoteService()
    })

    test('The QuoteService is instantiated', () => {
      expect(service).toBeDefined()
      expect(service).toBeInstanceOf(QuoteService)
    })

    describe('the model property', () => {
      it('is defined and is not static', () => {})
    })

    describe('search', () => {
      it('is defined and is NOT static', () => {
        expect(service.search).toBeDefined()
        expect(service.search).toBeInstanceOf(Function)
        expect(QuoteService.search).not.toBeDefined()
      })
      it.todo('is an async function')
    })

    describe('findById', () => {
      it('is defined and is NOT static', () => {
        expect(service.findById).toBeDefined()
        expect(service.findById).toBeInstanceOf(Function)
        expect(QuoteService.findById).not.toBeDefined()
      })
      it.todo('is an async function')
    })

    describe('create', () => {
      it('is defined and is NOT static', () => {
        expect(service.create).toBeDefined()
        expect(service.create).toBeInstanceOf(Function)
        expect(QuoteService.create).not.toBeDefined()
      })
      it.todo('is an async function')
    })

    describe('update', () => {
      it('is defined and is NOT static', () => {
        expect(service.update).toBeDefined()
        expect(service.update).toBeInstanceOf(Function)
        expect(QuoteService.update).not.toBeDefined()
      })
      it.todo('is an async function')
    })

    describe('remove', () => {
      it('is defined and is NOT static', () => {
        expect(service.remove).toBeDefined()
        expect(service.remove).toBeInstanceOf(Function)
        expect(QuoteService.remove).not.toBeDefined()
      })
      it.todo('is an async function')
    })
  })
})