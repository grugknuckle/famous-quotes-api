module.exports = {
  Quote: {
    type: 'object',
    description: 'A Quote document',
    required: [ 'text', 'author' ],
    properties: {
      id: { type: 'string', readOnly: true, description: 'The unique identifier of this document.' },
      text: { type: 'string', description: 'The acutall text of the document.' },
      author: {
        type: [ 'string', 'object' ],
        description: 'Either the unique identifier for an existing Author document, or an object representing that Author.'
      },
      citation: { type: 'string', description: 'The original reference to where this quotation was found?' },
      source: { type: 'string', description: 'The book, article, paper or speech that this quote is recorded from.' },
      tags: {
        type: 'string',
        description: 'A list of tags that describe the topic of the quotation.',
        items: { type: 'string' }
      },
      likes: { type: 'integer', description: 'The running count of likes this quote has. Not a scientific measure.' },
      dislikes: { type: 'integer', description: 'The running count of dislikes this quote has. Not a scientific measure.' },
      createdAt: { type: 'string', readOnly: true, description: 'The date and time that this document was added to the database.' },
      updatedAt: { type: 'string', readOnly: true, description: 'The data and time that this document was last updated.' },
    }
  },
  Author: {
    type: 'object',
    description: 'An Author document',
    required: [ 'fullName' ],
    properties: {
      id: { type: 'string', readOnly: true, description: 'The unique identifier of this document.', readOnly: true },
      fullName: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      middleName: { type: 'string' },
      born: { type: [ 'string', 'null' ], description: 'The date that the author was born, or null.' },
      died: { type: [ 'string', 'null' ], description: 'The date that the author died, or null.' },
      profession: { type: 'string', description: 'A description of the author\'s profession.' },
      bio: { type: 'string', description: 'A short biography of the author.' },
      reference: { type: 'string', description: 'The source (or sources) of information in this document.' },
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
      prevPage: { type: [ 'integer', 'null' ], description: '' },
      nextPage: { type: [ 'integer', 'null' ], description: '' },
    }
  }
}