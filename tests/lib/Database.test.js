const Database = require('../../src/lib/Database.js')

describe('Database class ...', () => {
  
  describe('constructor', () => {
    it.todo('sets the name property to "quotations"')
    it.todo('calls the "super" function')
  })

  describe('instance methods', () => {
    let database
    beforeAll(() => {
      database = new Database()
    })

    describe('connect', () => {
      it('is defined and is NOT static', () => {
        expect(database.connect).toBeDefined()
        expect(database.connect).toBeInstanceOf(Function)
        expect(Database.connect).not.toBeDefined()
      })
      it.todo('is an async function')
    })

    describe('disconnect', () => {
      it('is defined and is NOT static', () => {
        expect(database.disconnect).toBeDefined()
        expect(database.disconnect).toBeInstanceOf(Function)
        expect(Database.disconnect).not.toBeDefined()
      })
      it.todo('is an async function')
    })
  })
})