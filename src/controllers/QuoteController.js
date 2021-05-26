const Controller = require('./Controller')
const Quote = require('./../database/models/quote.model')

class QuoteController extends Controller {
  constructor() {
    super('quotations')
  }

  /**
   * Search the Quotes Collection.
   * 
   * TODO: implement query parameters to search by author, by key words, tags etc.
   * 
   * @async
   * @param {Request} req [Express.js](https://expressjs.com/) [request](https://expressjs.com/en/4x/api.html#req) object.
   * @param {Response} res [Express.js](https://expressjs.com/) [response](https://expressjs.com/en/4x/api.html#res) object.
   */
  async search(req, res) {
    try {
      const found = await Quote.find()
      const status = 200
      const data = found.map(q => q.format())
      const message = `found ${data.length} documents matching your query`
      const json = QuoteController.formatResponse(req, res, { status, message, data })
      res.status(status).json(json)
    } catch (error) {
      const json = QuoteController.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }  
  }

  /**
   * Search the Quotes Collection
   * 
   * @async
   * @param {Request} req [Express.js](https://expressjs.com/) [request](https://expressjs.com/en/4x/api.html#req) object.
   * @param {Response} res [Express.js](https://expressjs.com/) [response](https://expressjs.com/en/4x/api.html#res) object.
   */
  async findById(req, res) {
    try {
      const found = await Quote.findById(req.params.id)
      const status = found ? 200 : 404
      const data = found.format() ||  {}
      const message = found ? `Found document with id=${req.params.id}` : `Document with id=${req.params.id} not found.`
      const json = QuoteController.formatResponse(req, res, { status, data, message })
      res.status(status).json(json)
    } catch (error) {
      const json = QuoteController.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  }

  /**
   * Create a new document in the Quotes collection
   * 
   * @async
   * @param {Request} req [Express.js](https://expressjs.com/) [request](https://expressjs.com/en/4x/api.html#req) object.
   * @param {Response} res [Express.js](https://expressjs.com/) [response](https://expressjs.com/en/4x/api.html#res) object.
   */
  async create(req, res) {
    try {
      const body = Quote.parseRequestBody(req.body)
      const quote = new Quote(body)
      const data = await quote.save()
      const status = 201
      const json = QuoteController.formatResponse(req, res, { status, data, message: `Created new document.` })
      res.status(status).json(json)
    } catch (error) {
      const json = QuoteController.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  }

  /**
   * Update a document in the Quotes collection
   * 
   * @async
   * @param {Request} req [Express.js](https://expressjs.com/) [request](https://expressjs.com/en/4x/api.html#req) object.
   * @param {Response} res [Express.js](https://expressjs.com/) [response](https://expressjs.com/en/4x/api.html#res) object.
   */
  async update(req, res) {
    try {
      const found = await Quote.findById(req.params.id)
      const body = Quote.parseRequestBody(req.body)
      
      if (!found) {
        const status = 404
        const data = body
        const message = `Document with id=${req.params.id} was not found.`
        const json = QuoteController.formatResponse(req, res, { status, data, message })
        return res.status(status).json(json)
      }

      found.text = req.body.text ?? found.text
      found.author = req.body.author ?? found.author
      found.citation = req.body.citation ?? found.citation
      found.source = req.body.source ?? found.source
      found.tags = req.body.tags ?? found.tags
      found.likes = req.body.likes ?? found.likes
      found.dislikes = req.body.dislikes ?? found.dislikes
      found.increment()
      const updated = await found.save()

      const status = 200
      const data = updated.format()
      const message = `Updated document.`
      const json = QuoteController.formatResponse(req, res, { status, data, message })
      res.status(status).json(json)
    } catch (error) {
      const json = QuoteController.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  }

  /**
   * Delete a document from the Quotes collection
   * 
   * @async
   * @param {Request} req [Express.js](https://expressjs.com/) [request](https://expressjs.com/en/4x/api.html#req) object.
   * @param {Response} res [Express.js](https://expressjs.com/) [response](https://expressjs.com/en/4x/api.html#res) object.
   */
  async remove(req, res) {
    try {
      const removed = await Quote.findByIdAndRemove(req.params.id)
      const status = 200
      const data = removed.format()
      const message = `Removed document with id=${req.params.id}`

      const json = QuoteController.formatResponse(req, res, { status, data, message })
      res.status(status).json(json)
    } catch (error) {
      const json = QuoteController.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  }
}

module.exports = QuoteController