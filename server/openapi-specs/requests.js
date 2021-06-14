module.exports = {
  submitQuote: {
    description: 'Updated quote data',
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Quote' },       
      },
    },
  },
  submitAuthor: {
    description: 'Author to add to the system',
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Author' },       
      },
    },
  }
}