module.exports = {
  // path params
  id: {
    name: 'id',
    in: 'path',
    required: true,
    description: 'Internal ID of the requested resource',
    schema: { type: 'string' },
    example: '60b9533a479ac9a2804dca7b'
  },
  // query params
  populate: {
    name: 'populate',
    in: 'query',
    required: false,
    allowEmptyValue: true,
    description: 'Whether or not to populate sub-documents.',
    schema: {
      type: 'string',
      enum: [ 'T', 'F' ],
      default: 'F'
    },
    example: 'T'
  },
  limit: {
    name: 'limit',
    in: 'query',
    required: false,
    allowEmptyValue: true,
    description: 'The maximum number of documents to return from the query.',
    schema: { type: 'integer', minimum: 1, maximum: 1000, default: 50 },
    example: 25
  },
  page: {
    name: 'page',
    in: 'query',
    required: false,
    allowEmptyValue: true,
    description: 'The page number to return fromt the query',
    schema: { type: 'integer', minimum: 1 },
    example: 2
  },
  author: {
    name: 'author',
    in: 'query',
    required: false,
    allowEmptyValue: true,
    description: 'ID of an author. Used to search for quotations from the author with this ID.',
    schema: { type: 'string' },
    example: '60b9532dc5faa768fc3b9c31'
  },
  text: {
    name: 'text',
    in: 'query',
    required: false,
    allowEmptyValue: true,
    description: 'Search for quotations whose text contains this string fragment. Replace whitespace with the "+" character.',
    schema: { type: 'string' },
    example: 'Courage+stands+halfway+between+cowardice+and+rashness'
  }
  // cookie params
  // header params
}