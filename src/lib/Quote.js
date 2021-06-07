class Quote {
  constructor() {}

  format() {
    const formatted = {
      id: this._id,
      text: this.text,
      author: this.author,
      citation: this.citation,
      source: this.source,
      tags: this.tags,
      likes: this.likes,
      dislikes: this.dislikes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      revision: this._v
    }
    return formatted
  }

  patch(body) {
    this.text = body.text ?? found.text
    this.author = body.author ?? found.author
    this.citation = body.citation ?? found.citation
    this.source = body.source ?? found.source
    this.tags = body.tags ?? found.tags
    this.likes = body.likes ?? found.likes
    this.dislikes = body.dislikes ?? found.dislikes
    this.increment()
  }

  static parseQuery(query) {
    let filter = {}
    if (query.text) {
      filter.text = { $regex: `${query.text}`, $options: 'i' }
    }
    if (query.author) {
      filter.author = query.author
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
      populate: ''
    }
    
    if (query.populate && (query.populate.toUpperCase() == 'T')) {
      // should populate all populate-able fields
      options.populate = 'author'
    } else if (query.populate && 'author' == query.populate.toLowerCase()) {
      options.populate = 'author'
    }
    return { filter, options }
  }

  static parseInput(body) {
    const data = {
      text: body.text,
      author: body.author,
      citation: body.citation,
      source: body.source,
      tags: body.tags,
      likes: body.likes || 0,
      dislikes: body.dislikes || 0
    }
    return data
  }

  static jsonSchema() {
    return {}
  }
}

module.exports = Quote