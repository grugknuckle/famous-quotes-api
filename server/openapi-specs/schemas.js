module.exports = {
  Quote: {
    type: 'object',
    description: 'A Quote document',
    required: ['text', 'author'],
    properties: {
      id: { type: 'string', readOnly: true, description: 'The unique identifier of this document.' },
      text: {
        type: 'string',
        description: 'The acutall text of the document.',
        example: 'Courage stands halfway between cowardice and rashness, one of which is a lack, the other an excess of courage.'
      },
      author: {
        type: ['string', 'object'],
        description: 'Either the unique identifier for an existing Author document, or an object representing that Author.',
        example: '60b9532dc5faa768fc3b9c31',
      },
      citation: {
        type: 'string',
        description: 'The original reference to where this quotation was found?',
        example: '\'Plutarch Quotes.\' BrainyQuote.com. BrainyMedia Inc, 2021. 1 March 2021. https://www.brainyquote.com/quotes/plutarch_387443'
      },
      source: {
        type: 'string',
        description: 'The book, article, paper or speech that this quote is recorded from.',
        example: 'https://www.brainyquote.com/quotes/plutarch_387443'
      },
      tags: {
        type: 'string',
        description: 'A list of tags that describe the topic of the quotation.',
        items: { type: 'string' },
        example: ['courage', 'cowardice']
      },
      likes: { type: 'integer', description: 'The running count of likes this quote has. Not a scientific measure.', example: 1 },
      dislikes: { type: 'integer', description: 'The running count of dislikes this quote has. Not a scientific measure.', example: 0 },
      createdAt: { type: 'string', readOnly: true, description: 'The date and time that this document was added to the database.' },
      updatedAt: { type: 'string', readOnly: true, description: 'The data and time that this document was last updated.' },
    }
  },
  Author: {
    type: 'object',
    description: 'An Author document',
    required: ['fullName'],
    properties: {
      id: { type: 'string', readOnly: true, description: 'The unique identifier of this document.', readOnly: true },
      fullName: {
        type: 'string',
        example: 'Abraham Lincoln'
      },
      firstName: {
        type: 'string',
        example: 'Abraham'
      },
      middleName: {
        type: 'string',
        example: ''
      },
      lastName: {
        type: 'string',
        example: 'Lincoln'
      },
      born: {
        type: ['string', 'null'],
        description: 'The date that the author was born, or null.',
        example: '1819-02-12T04:00:00.000Z'
      },
      died: {
        type: ['string', 'null'],
        description: 'The date that the author died, or null.',
        example: '1865-04-15T04:00:00.000Z'
      },
      profession: {
        type: 'string',
        description: 'A description of the author\'s profession.',
        example: 'President of the United States'
      },
      bio: {
        type: 'string',
        description: 'A short biography of the author.',
        example: ''
      },
      reference: {
        type: 'string',
        description: 'The source (or sources) of information in this document.',
        example: 'https://en.wikipedia.org/wiki/Abraham_Lincoln'
      },
      createdAt: { type: 'string', readOnly: true, description: 'The date and time that this document was added to the database.' },
      updatedAt: { type: 'string', readOnly: true, description: 'The data and time that this document was last updated.' },
    }
  },
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