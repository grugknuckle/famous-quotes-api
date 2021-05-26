// const tv4 = require('tv4')
// const moment = require('moment')
// const formatString = 'YYYY-MM-DDTHH:mm:ss'

/**
 * Handles the enqueuing of tasks, formatting of responses and errors for a a set of endpoints. 
 *
 * @alias module:Models.Controller
 */
class Controller {
  constructor({ name }) {
    this.name = name
  }

  /**
   * A hash-map keyed by HTTP status codes to the status text and success boolean.
   * 
   * @static
   * @constant
   * @type {object} 
   */
  static get httpCodes() {
    return {
      200: { success: true, text: 'OK' },
      202: { success: true, text: 'ACCEPTED' },
      201: { success: true, text: 'CREATED' },
      204: { success: true, text: 'NO CONTENT' },
      207: { success: true, text: 'MULTI-STATUS' },
      304: { success: false, text: 'NOT MODIFIED' },
      400: { success: false, text: 'BAD REQUEST' },
      401: { success: false, text: 'UNAUTHORIZED' },
      403: { success: false, text: 'FORBIDDEN' },
      404: { success: false, text: 'NOT FOUND' },
      409: { success: false, text: 'CONFLICT' },
      500: { success: false, text: 'INTERNAL SERVER ERROR' },
      501: { success: false, text: 'NOT IMPLEMENTED' },
    }
  }

  /**
   * A hash-map keyed by HTTP verb and returning associate CRUD verb
   * 
   * @static
   * @constant
   * @type {object}
   */
  static get cruds() {
    return {
      POST: 'create',
      GET: 'read',
      PUT: 'update',
      DELETE: 'delete',
    }
  }

  /**
   * Format the JSON response with meta data and respond to requester
   *
   * @static
   * @param {Object} req Express.js request object. https://expressjs.com/en/4x/api.html#req
   * @param {Object} res Express.js response object https://expressjs.com/en/4x/api.html#res
   * @param {Object} param
   * @param {String} param.controller The name of the netsuite controller to talk to one of
   *          items, transactions, entities, inventory, testing, design, communication.
   * @param {Number} param.status The HTTP status code
   * @param {String} param.message The HTTP(s) request body of the relayed request.
   * @param {Object} param.data The response data
   */
  static formatResponse(req, res, { status, message, data }) {
    status = Controller.httpCodes.hasOwnProperty(status) ? status : 500
    const stat = Controller.httpCodes[status]
    const response = {
      method: req.method.toUpperCase(),
      controller: this.name,
      success: stat.success,
      status,
      statusText: stat.text,
      message,
      data,
    }
    return response
  }
}

module.exports = Controller