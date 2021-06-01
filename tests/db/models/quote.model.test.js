const Database = require('./../../../src/lib/Database.js')
const uri = process.env.DB_CONNECTION_STRING
const database = new Database(uri)

describe('The Quote Model ...', () => {

  beforeAll(async () => {
    await database.connect()
  })

  afterAll(async () => {
    await database.disconnect()
  })

  describe('Quote Schema', () => {
    it.todo('has a text property')
  })
})
