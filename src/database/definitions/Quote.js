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