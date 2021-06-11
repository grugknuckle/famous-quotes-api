const { content } = require('../responses')

module.exports = {
  '/api/v1/authors': {
    get: {
      tags: [ 'Authors' ],
      summary: 'Search Authors by query',
      description: `Find a list authors which match the query parameters passed in the url`,
      parameters: [
        { '$ref': '#/components/parameters/populate' },
        { '$ref': '#/components/parameters/limit' },
        { '$ref': '#/components/parameters/page' },
      ],
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Paginated' }) },
        '400': { '$ref': '#/components/responses/400' }, // bad request
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
        '404': { '$ref': '#/components/responses/404' }, // not found
      },
      // 'x-code-samples': sample.get('/catalog')
    }
  },
  '/api/v1/authors/{id}': {
    get: {
      tags: [ 'Authors' ],
      summary: 'Find Author by ID',
      parameters: [
        { '$ref': '#/components/parameters/id' },
        { '$ref': '#/components/parameters/populate' },
      ],
      description: `Finds a Author document that has the passed id.`,
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Author' }) },
        '400': { '$ref': '#/components/responses/400' }, // bad request
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
        '404': { '$ref': '#/components/responses/404' }, // not found
      },
      // 'x-code-samples': sample.get('/catalog/prod')
    },
    put: {
      tags: [ 'Authors' ],
      summary: 'Update Author',
      parameters: [
        { '$ref': '#/components/parameters/id' },
      ],
      requestBody: {
        description: 'Updated author data',
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Author' },       
          },
        },
      },
      description: `Describe the columns of the table with the passed table name.`,
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Paginated' }) },
        '400': { '$ref': '#/components/responses/400' }, // bad request
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
        '404': { '$ref': '#/components/responses/404' }, // not found
        // '500': { '$ref': '#/components/responses/500' }
      },
      // 'x-code-samples': sample.get('/catalog/prod')
    },
    delete: {
      tags: [ 'Authors' ],
      summary: 'Delete Author',
      parameters: [
        { '$ref': '#/components/parameters/id' },
      ],
      description: `Removes the single quote associated to the passed id from the database.`,
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Paginated' }) },
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
        '404': { '$ref': '#/components/responses/404' }, // not found
      },
      // 'x-code-samples': sample.get('/catalog/prod')
    },
  },
  '/api/v1/authors/add': {
    post: {
      tags: [ 'Authors' ],
      summary: 'Create Author',
      description: `Find a list authors which match the query parameters passed in the url`,
      requestBody: {
        description: 'Author to add to the system',
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Author' },       
          },
        },
      },
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Author' }) },
        '400': { '$ref': '#/components/responses/400' }, // bad request
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
        '404': { '$ref': '#/components/responses/404' }, // not found
      },
      // 'x-code-samples': sample.get('/catalog')
    }
  },
}