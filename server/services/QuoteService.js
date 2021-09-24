const QuoteModel = require('./../models/quote.model')

class QuoteService {
  static get jsonSchema () {
    return QuoteModel.jsonSchema()
  }

  static async search (query) {
    const { filter, options } = QuoteModel.parseQuery(query)
    const found = await QuoteModel.paginate(filter, options)
    found.docs = found.docs.map(document => document.format())
    return { status: 200, message: `found ${found.totalDocs} documents matching your query`, data: found }
  }

  static async findById (id, query) {
    const { options } = QuoteModel.parseQuery(query)
    const found = await QuoteModel.findById(id).populate({ path: options.populate })
    const status = found ? 200 : 404
    const message = found ? `Found document with id=${id}` : `Document with id=${id} not found.`
    const data = found ? found.format() : {}
    return { status, message, data }
  }

  static async update (input, id) {
    const found = await QuoteModel.findById(id)
    const body = QuoteModel.parseInput(input)

    if (!found) {
      return { status: 404, message: `Document with id=${id} was not found.`, data: body }
    }

    found.patch(body)
    const updated = await found.save()

    return { status: 200, message: `Updated document with id=${id}`, data: updated.format() }
  }

  static async create (input) {
    const document = new QuoteModel(QuoteModel.parseInput(input))
    const data = await document.save()
    return { status: 201, message: 'Created new document.', data }
  }

  static async remove (id) {
    const removed = await QuoteModel.findByIdAndRemove(id)
    const status = 200
    const data = removed.format()
    const message = `Removed document with id=${id}`
    return { status, data, message }
  }
}
module.exports = QuoteService
