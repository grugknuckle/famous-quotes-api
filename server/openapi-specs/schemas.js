const Author = require('./../lib/Author')
const Quote = require('./../lib/Quote')

module.exports = {
  Quote: Quote.jsonSchema(),
  Author: Author.jsonSchema(),
  Paginated: {
    type: 'object',
    description: '',
    properties: {
      docs: {
        type: 'array',
        description: 'List of documents matching the query.',
        items: {
          oneOf: [
            { '$ref': '#/components/schemas/Quote' },
            { '$ref': '#/components/schemas/Author' }
          ]
        }
      },
      totalDocs: { type: 'integer', description: '' },
      limit: { type: 'integer', description: '' },
      totalPages: { type: 'integer', description: '' },
      page: { type: 'integer', description: '' },
      pagingCounter: { type: 'integer', description: '' },
      hasPrevPage: { type: 'boolean', description: '' },
      hasNextPage: { type: 'boolean', description: '' },
      prevPage: { type: ['integer', 'null'], description: '' },
      nextPage: { type: ['integer', 'null'], description: '' },
    }
  }
}