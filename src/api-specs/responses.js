
module.exports = {
  get(schema) {
    return {
      '200': { description: 'OK', content: content(schema) },
      '400': { '$ref': '#/components/responses/400' },
      '401': { '$ref': '#/components/responses/401' },
      '403': { '$ref': '#/components/responses/403' },
      '404': { '$ref': '#/components/responses/404' },
      '500': { '$ref': '#/components/responses/500' }
    }
  },
  put(schema) {
    return {
      '200': { description: 'OK', content: content(schema) },
      '304': { '$ref': '#/components/responses/304' },
      '400': { '$ref': '#/components/responses/400' },
      '401': { '$ref': '#/components/responses/401' },
      '403': { '$ref': '#/components/responses/403' },
      '404': { '$ref': '#/components/responses/404' },
      '500': { '$ref': '#/components/responses/500' }
    }
  },
  post(schema) {
    return {
      '201': { description: 'Created', content: content(schema) },
      '400': { '$ref': '#/components/responses/400' },
      '401': { '$ref': '#/components/responses/401' },
      '403': { '$ref': '#/components/responses/403' },
      '404': { '$ref': '#/components/responses/404' },
      '500': { '$ref': '#/components/responses/500' }
    }
  },
  delete(schema) {
    return {
      '200': { description: 'OK', content: content(schema) },
      '304': { '$ref': '#/components/responses/304' },
      '400': { '$ref': '#/components/responses/400' },
      '401': { '$ref': '#/components/responses/401' },
      '403': { '$ref': '#/components/responses/403' },
      '404': { '$ref': '#/components/responses/404' },
      '500': { '$ref': '#/components/responses/500' }
    }
  },
  notImplemented() {
    return {
      '501': { '$ref': '#/components/responses/501' }
    }
  },
  all() {
    return {
      '200': { description: 'OK', content: content() },
      '201': { description: 'CREATED', content: content() },
      '204': { description: 'NO CONTENT', content: content() },
      '304': { description: 'NOT MODIFIED', content: content() },
      '400': { description: 'BAD REQUEST', content: content() },
      '401': { description: 'UNAUTHORIZED', content: content() },
      '403': { description: 'FORBIDDEN', content: content() },
      '404': { description: 'NOT FOUND', content: content() },
      '500': { description: 'SERVER ERROR', content: content({ '$ref': '#/components/schemas/netsuiteError' }) },
      '501': { description: 'NOT IMPLEMENTED', content: content() },
    }
  },
  content,
  xlsx
}

function content(schema) {
  // schema: { '$ref': '#/components/schemas/response' }
  data = (!!schema) ? schema : { type: 'object', description: 'An object containing the successful response data.' }
  return {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          method: { type: 'string', description: 'The HTTP method used in the request.' },
          controller: { type: 'string', description: 'The name of the controller which responded to the request.' },
          resource: { type: 'string', description: 'The URL of the requested resource.' },
          success: { type: 'boolean', description: 'Was the request successful?' },
          status: { type: 'integer', description: 'The HTTP status code' },
          statusText: { type: 'string', description: 'A description of the http status code.' },
          message: { type: 'string', description: 'A description of the the action taken by the NetSuite server.' },
          data
        }
      }
    }
  }
}

function xlsx() {
  return {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      schema: {
        type: 'string',
        format: 'binary'
      }
    }
  }
}
