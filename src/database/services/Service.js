class Service {
  constructor(model) {
    this._model = model
  }

  get model() { return this._model }

  async search(query) {
    const { filter, options } = this.model.parseQuery(query)
    const found = await this.model.paginate(filter, options)
    found.docs = found.docs.map(document => document.format())
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

    found.patch(body)
    const updated = await found.save()

    return { status: 200, message: `Updated document with id=${id}`, data: updated.format() }
  }
  
  async create(input) {
    const document = new this.model(this.model.parseInput(input))
    const data = await document.save()
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
module.exports = Service