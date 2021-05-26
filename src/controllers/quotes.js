const Quote = require('./../database/models/quote.model')

/**
 * [Express.js](https://expressjs.com/) [request](https://expressjs.com/en/4x/api.html#req) object.
 * @typedef {Object} Request
 */

/**
 * [Express.js](https://expressjs.com/) [response](https://expressjs.com/en/4x/api.html#res) object.
 * @typedef {Object} Response
 */

/**
 * A hash-map keyed by HTTP status codes to the status text and success boolean.
 * 
 * @static
 * @constant
 * @type {object} 
 */
 const httpCodes = {
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

/**
 * Controller for API endpoints related to the Quotes Collection.
 * 
 * @module QuotesController
 */
module.exports = {
  search,
  findById,
  create,
  update,
  remove,
}

// Don't forge to use aliasing in jsdocs ... @alias module:Controllers.searchQuotes

/**
 * Search the Quotes Collection.
 * 
 * TODO: implement query parameters to search by author, by key words, tags etc.
 * 
 * @param {Request} req [Express.js](https://expressjs.com/) [request](https://expressjs.com/en/4x/api.html#req) object.
 * @param {Response} res [Express.js](https://expressjs.com/) [response](https://expressjs.com/en/4x/api.html#res) object.
 */
async function search(req, res) {
  try {
    const found = await Quote.find()
    const data = found.map(q => q.format())
    const status = 200
    const response = formatResponse(req, res, { status, data, message: `found ${data.length} documents matching your query` })
    res.status(status).json(response)
  } catch (error) {
    res.json(errorHandler(req, res, error))
  }  
}

/**
 * Search the Quotes Collection
 * 
 * @param {Request} req [Express.js](https://expressjs.com/) [request](https://expressjs.com/en/4x/api.html#req) object.
 * @param {Response} res [Express.js](https://expressjs.com/) [response](https://expressjs.com/en/4x/api.html#res) object.
 */
async function findById(req, res) {
  try {
    const found = await Quote.findById(req.params.id)
    const status = found ? 200 : 404
    const data = found.format() ||  {}
    const message = found ? `Found document with id=${req.params.id}` : `Document with id=${req.params.id} not found.`
    const json = formatResponse(req, res, { status, data, message })
    res.status(status).json(json)
  } catch (error) {
    res.status(500).json(errorHandler(req, res, error))
  }
}

/**
 * Create a new document in the Quotes collection
 * 
 * @param {Request} req [Express.js](https://expressjs.com/) [request](https://expressjs.com/en/4x/api.html#req) object.
 * @param {Response} res [Express.js](https://expressjs.com/) [response](https://expressjs.com/en/4x/api.html#res) object.
 */
async function create(req, res) {
  try {
    const body = Quote.parseQuoteBody(req)
    const quote = new Quote(body)
    const data = await quote.save()
    const status = 201
    const json = formatResponse(req, res, { status, data, message: `Created new document.` })
    res.status(status).json(json)
  } catch (error) {
    res.status(500).json(errorHandler(req, res, error))
  }
}

/**
 * Update a document in the Quotes collection
 * 
 * @param {Request} req [Express.js](https://expressjs.com/) [request](https://expressjs.com/en/4x/api.html#req) object.
 * @param {Response} res [Express.js](https://expressjs.com/) [response](https://expressjs.com/en/4x/api.html#res) object.
 */
async function update(req, res) {
  try {
    const found = await Quote.findById(req.params.id)
    console.log(found)
    const body = Quote.parseQuoteBody(req)
    
    if (!found) {
      const json = formatResponse(req, res, { status: 404, data: body, message: `Document with id=${req.params.id} was not found.` })
      return res.json(json)
    }

    found.text = req.body.text ?? found.text
    found.author = req.body.author ?? found.author
    found.citation = req.body.citation ?? found.citation
    found.source = req.body.source ?? found.source
    found.tags = req.body.tags ?? found.tags
    found.likes = req.body.likes ?? found.likes
    found.dislikes = req.body.dislikes ?? found.dislikes
    found.increment()
    console.log(found)
    const data = await found.save()
    const json = formatResponse(req, res, { status: 200, data: data.format(), message: `Updated document.` })
    res.status(200).json(json)
  } catch (error) {
    res.json(errorHandler(req, res, error))
  }
}

/**
 * Delete a document from the Quotes collection
 * 
 * @param {Request} req [Express.js](https://expressjs.com/) [request](https://expressjs.com/en/4x/api.html#req) object.
 * @param {Response} res [Express.js](https://expressjs.com/) [response](https://expressjs.com/en/4x/api.html#res) object.
 */
async function remove(req, res) {
  try {
    const removed = await Quote.findByIdAndRemove(req.params.id)
    const data = removed.format()
    const status = 200
    const json = formatResponse(req, res, { status, data, message: `Removed document with id=${req.params.id}` })
    res.status(status).json(json)
  } catch (error) {
    res.status(500).json(errorHandler(req, res, error))
  }
}

// function parseQuoteBody(req) {
//   const body = {
//     text: req.body.text,
//     author: req.body.author,
//     citation: req.body.citation,
//     source: req.body.source,
//     tags: req.body.tags,
//     likes: req.body.likes || 0,
//     dislikes: req.body.dislikes || 0
//   }
//   return body
// }

function errorHandler(req, res, error) {
  // TODO: set different status codes based on the error message
  const status = httpCodes[500]
  const response = {
    method: req.method.toUpperCase(),
    resource: req.baseUrl,
    success: status.success,
    status: 500,
    statusText: status.text,
    message: error.message,
    data: {
      error
    }
  }
  return response
}

function formatResponse(req, res, { status, message, data }) {
  status = httpCodes.hasOwnProperty(status) ? status : 500
  const stat = httpCodes[status]
  const response = {
    method: req.method.toUpperCase(),
    resource: req.baseUrl,
    success: stat.success,
    status,
    statusText: stat.text,
    message,
    data
  }
  return response
}