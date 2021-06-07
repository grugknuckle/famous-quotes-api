const { content } = require('./../responses')

module.exports = {
  '/api/v1/quotes': {
    get: {
      tags: [ 'Quotes' ],
      summary: 'Search Quotes by query',
      description: `Find a list quotes which match the query parameters passed in the url`,
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Paginated' }) },
        '400': { '$ref': '#/components/responses/400' },
        '401': { '$ref': '#/components/responses/401' },
        '403': { '$ref': '#/components/responses/403' },
        '404': { '$ref': '#/components/responses/404' },
        // '500': { '$ref': '#/components/responses/500' }
      },
      // 'x-code-samples': sample.get('/catalog')
    }
  },
  '/api/v1/quotes/{id}': {
    get: {
      tags: [ 'Quotes' ],
      summary: 'Find Quote by ID',
      parameters: [
        { "$ref": "#/components/parameters/id" },
      ],
      description: `Finds a Quote document that has the passed id.`,
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Paginated' }) },
        '400': { '$ref': '#/components/responses/400' },
        '401': { '$ref': '#/components/responses/401' },
        '403': { '$ref': '#/components/responses/403' },
        '404': { '$ref': '#/components/responses/404' },
        // '500': { '$ref': '#/components/responses/500' }
      },
      // 'x-code-samples': sample.get('/catalog/prod')
    },
    put: {
      tags: [ 'Quotes' ],
      summary: 'Update Quote',
      parameters: [
        { "$ref": "#/components/parameters/id" },
      ],
      description: `Describe the columns of the table with the passed table name.`,
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Paginated' }) },
        '400': { '$ref': '#/components/responses/400' },
        '401': { '$ref': '#/components/responses/401' },
        '403': { '$ref': '#/components/responses/403' },
        '404': { '$ref': '#/components/responses/404' },
        // '500': { '$ref': '#/components/responses/500' }
      },
      // 'x-code-samples': sample.get('/catalog/prod')
    }
  },
}