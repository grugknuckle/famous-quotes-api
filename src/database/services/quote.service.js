class QuoteService {
  constructor(model) {
    this._model = model
  }

  get model() { return this._model }

  async search(query) {
    let filter = {}
    if (query.text) {
      filter.text = { $regex: `${query.text}`, $options: 'i' }
    }
    if (query.author) {
      filter.author = { $regex: query.author, $options: 'i' }
    }
    if (query.citation) {
      filter.citation = { $regex: query.citation, $options: 'i' }
    }
    if (query.source) {
      filter.source = { $regex: query.source, $options: 'i' }
    }
    const options = {
      page: parseInt(query.page ?? 1),
      limit: parseInt(query.limit ?? 50),
    }

    const found = await this.model.paginate(filter, options)
    found.docs = found.docs.map(quote => quote.format())
    return { status: 200, message: `found ${found.totalDocs} documents matching your query`, data: found }
  }
  
  async findById(id) {
    const found = await this.model.findById(id)
    const status = found ? 200 : 404
    const message = found ? `Found document with id=${id}` : `Document with id=${id} not found.`
    const data = found.format() ||  {}
    return { status, message, data }
  }
  
  async update(input, id) {
    const found = await this.model.findById(id)
    const body = this.model.parseInput(input)
    
    if (!found) {
      return { status: 404, message: `Document with id=${id} was not found.`, data: body }
    }

    found.text = body.text ?? found.text
    found.author = body.author ?? found.author
    found.citation = body.citation ?? found.citation
    found.source = body.source ?? found.source
    found.tags = body.tags ?? found.tags
    found.likes = body.likes ?? found.likes
    found.dislikes = body.dislikes ?? found.dislikes
    found.increment()
    const updated = await found.save()

    return { status: 200, message: `Updated document with id=${id}`, data: updated.format() }
  }
  
  async create(input) {
    const quote = new this.model(this.model.parseInput(input))
    const data = await quote.save()
    return { status: 201, message: `Created new document.`, data }
  }
  
  async remove(id) {
    const removed = await this.model.findByIdAndRemove(id)
    const status = 200
    const data = removed.format()
    const message = `Removed document with id=${id}`
    return { status, data, message }
  }

}
module.exports = QuoteService