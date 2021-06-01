class QuoteService {
  constructor(model) {
    this._model = model
  }

  get model() { return this._model }

  async search() {
    const found = await this.model.find()
    const data = found.map(q => q.format())
    return { status: 200, message: `found ${data.length} documents matching your query`, data }
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