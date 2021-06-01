const Quote = require('./../../../src/database/definitions/Quote')

describe('The Quote class definition ...', () => {

  describe('format', () => {
    it('is defined and is NOT static', () => {
      const quote = new Quote()
      expect(Quote.format).not.toBeDefined()
      expect(quote.format).toBeDefined()
      expect(quote.format).toBeInstanceOf(Function)
    })
  })

  describe('parseInput', () => {
    it('is defined and is static', () => {
      const quote = new Quote()
      expect(Quote.parseInput).toBeDefined()
      expect(quote.parseInput).not.toBeDefined()
      expect(Quote.parseInput).toBeInstanceOf(Function)
    })
  })

  describe('jsonSchema', () => {
    it('is defined and is static', () => {
      const quote = new Quote()
      expect(Quote.jsonSchema).toBeDefined()
      expect(quote.jsonSchema).not.toBeDefined()
      expect(Quote.jsonSchema).toBeInstanceOf(Function)
    })
  })
})