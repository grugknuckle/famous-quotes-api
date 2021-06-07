const Service = require('../lib/Service')
const QuoteModel = require('../models/quote.model')

class QuoteService extends Service {
  constructor() {
    super(QuoteModel)
  }
 
  async findById(id) {
    const found = await this.model.findById(id).populate({ path: 'author' })
    const status = found ? 200 : 404
    const message = found ? `Found document with id=${id}` : `Document with id=${id} not found.`
    let data = found ? found.format() : {}
    return { status, message, data }
  }
}
module.exports = QuoteService