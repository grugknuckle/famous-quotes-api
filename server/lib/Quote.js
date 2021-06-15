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
      // likes: this.likes,
      // dislikes: this.dislikes,
      rating: this.rating,
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
    return {
      type: 'object',
      description: 'A Quote document',
      required: ['text', 'author'],
      properties: {
        id: { type: 'string', readOnly: true, description: 'The unique identifier of this document.' },
        text: {
          type: 'string',
          description: 'The acutall text of the document.',
          example: 'Courage stands halfway between cowardice and rashness, one of which is a lack, the other an excess of courage.'
        },
        author: {
          type: ['string', 'object'],
          description: 'Either the unique identifier for an existing Author document, or an object representing that Author.',
          example: '60b9532dc5faa768fc3b9c31',
        },
        citation: {
          type: 'string',
          description: 'The original reference to where this quotation was found?',
          example: '\'Plutarch Quotes.\' BrainyQuote.com. BrainyMedia Inc, 2021. 1 March 2021. https://www.brainyquote.com/quotes/plutarch_387443'
        },
        source: {
          type: 'string',
          description: 'The book, article, paper or speech that this quote is recorded from.',
          example: 'https://www.brainyquote.com/quotes/plutarch_387443'
        },
        tags: {
          type: 'string',
          description: 'A list of tags that describe the topic of the quotation.',
          items: { type: 'string' },
          example: ['courage', 'cowardice']
        },
        // likes: {
        //   type: 'integer', description: 'The running count of likes this quote has. Not a scientific measure.',
        //   example: 1
        // },
        // dislikes: {
        //   type: 'integer', description: 'The running count of dislikes this quote has. Not a scientific measure.',
        //   example: 0
        // },
        rating: {
          type: 'number', description: 'The rating on a scale of 0 to 5 stars.',
          example: 2.5
        },
        createdAt: {type: 'string', readOnly: true, description: 'The date and time that this document was added to the database.' },
        updatedAt: { type: 'string', readOnly: true, description: 'The data and time that this document was last updated.' },
      }
    }
  }
}

module.exports = Quote