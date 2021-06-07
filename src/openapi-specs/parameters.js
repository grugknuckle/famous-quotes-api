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
    description: 'The maximum number of documents to return from the query.',
    schema: { type: 'integer', minimum: 1 },
    example: 2
  },
  // cookie params
  // header params
}