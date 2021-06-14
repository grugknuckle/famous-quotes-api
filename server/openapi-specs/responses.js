
module.exports = {
  content,
  xlsx
}

/**
 * 
 * @param {*} schema 
 * @returns 
 */
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

/**
 * Defines the schema for returning an Excel spreadsheet.
 * 
 * @returns {object} The schema of an xlsx spreadsheet to be returned.
 */
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
