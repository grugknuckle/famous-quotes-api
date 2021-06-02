const Service = require('./Service')
const QuoteModel = require('./../models/quote.model')
const AuthorModel = require('./../models/author.model')
class QuoteService extends Service {
  constructor() {
    super(QuoteModel)
  }
 
  async findById(id) {
    const found = await this.model.findById(id)
      // .populate({ path: 'author' })
      // .exec()
    // const author = await AuthorModel.findById(found.author)
    const status = found ? 200 : 404
    const message = found ? `Found document with id=${id}` : `Document with id=${id} not found.`
    let data = found.format() ||  {}
    // data.author = author.format()
    return { status, message, data }
  }
}
module.exports = QuoteService