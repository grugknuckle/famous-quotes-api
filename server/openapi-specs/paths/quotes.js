const { content } = require('../responses')

module.exports = {
  '/api/v1/quotes': {
    get: {
      tags: [ 'Quotes' ],
      summary: 'Search Quotes by query',
      description: `Find a list quotes which match the query parameters passed in the url. Results are paginated into sets of </br></br>
      A 401 Unauthorized response will be returned if the requestor is not logged in.`,
      parameters: [
        { '$ref': '#/components/parameters/populate' },
        { '$ref': '#/components/parameters/limit' },
        { '$ref': '#/components/parameters/page' },
      ],
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Paginated' }) },
        // '400': { '$ref': '#/components/responses/400' }, // bad request
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
      },
      // 'x-code-samples': sample.get('/catalog')
    }
  },
  '/api/v1/quotes/{id}': {
    get: {
      tags: [ 'Quotes' ],
      summary: 'Find Quote by ID',
      parameters: [
        { '$ref': '#/components/parameters/id' },
        { '$ref': '#/components/parameters/populate' },
      ],
      description: `Finds a Quote document that has the passed id.`,
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Quote' }) },
        '400': { '$ref': '#/components/responses/400' }, // bad request
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
        '404': { '$ref': '#/components/responses/404' }, // not found
      },
      // 'x-code-samples': sample.get('/catalog/prod')
    },
    put: {
      tags: [ 'Quotes' ],
      summary: 'Update Quote',
      parameters: [
        { '$ref': '#/components/parameters/id' },
      ],
      requestBody: {
        description: 'Updated quote data',
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Quote' },       
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
      tags: [ 'Quotes' ],
      summary: 'Delete Quote',
      parameters: [
        { '$ref': '#/components/parameters/id' },
      ],
      description: `Removes the single quote associated to the passed id from the database.`,
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Paginated' }) },
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
        '403': { '$ref': '#/components/responses/403' }, // forbidden
        '404': { '$ref': '#/components/responses/404' }, // not found
      },
      // 'x-code-samples': sample.get('/catalog/prod')
    },
  },
  '/api/v1/quotes/add': {
    post: {
      tags: [ 'Quotes' ],
      summary: 'Create Quote',
      description: `Find a list quotes which match the query parameters passed in the url`,
      requestBody: {
        description: 'Quote to add to the system',
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Quote' },       
          },
        },
      },
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Quote' }) },
        '400': { '$ref': '#/components/responses/400' }, // bad request
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
        '404': { '$ref': '#/components/responses/404' }, // not found
      },
      // 'x-code-samples': sample.get('/catalog')
    }
  },
}