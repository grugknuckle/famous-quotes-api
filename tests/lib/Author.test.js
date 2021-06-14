const Author = require('../../server/lib/Author')

describe('The Author class definition ...', () => {

  describe('format', () => {
    it('is defined and is NOT static', () => {
      const quote = new Author()
      expect(Author.format).not.toBeDefined()
      expect(quote.format).toBeDefined()
      expect(quote.format).toBeInstanceOf(Function)
    })
  })

  describe('parseInput', () => {
    it('is defined and is static', () => {
      const quote = new Author()
      expect(Author.parseInput).toBeDefined()
      expect(quote.parseInput).not.toBeDefined()
      expect(Author.parseInput).toBeInstanceOf(Function)
    })
  })

  describe('jsonSchema', () => {
    it('is defined and is static', () => {
      const quote = new Author()
      expect(Author.jsonSchema).toBeDefined()
      expect(quote.jsonSchema).not.toBeDefined()
      expect(Author.jsonSchema).toBeInstanceOf(Function)
    })
  })
})