const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema;

/*
Example data

{
  "text": "You can fool all the people some of the time, and some of the people all the time, but you cannot fool all the people all the time.",
  "author": "Abraham Lincoln",
  "citation": "\"Abraham Lincoln Quotes.\" BrainyQuote.com. BrainyMedia Inc, 2021. 1 March 2021. https://www.brainyquote.com/quotes/abraham_lincoln_110340",
  "source": "https://www.brainyquote.com/quotes/abraham_lincoln_110340",
  "tags": [],
  "likes": 0,
  "dislikes": 0
  },
*/

//https://mongoosejs.com/docs/schematypes.html#schematype-options

const structure = {
  text: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  citation: {
    type: String,
    required: false
  },
  source: {
    type: String,
    required: false
  },
  tags: {
    type: [String],
    required: false,
    default: []
  },
  likes: { 
    type: Number,
    required: false,
    min: 0,
    default: 0
  },
  dislikes: {
    type: Number,
    required: false,
    min: 0,
    default: 0
  }
}
const options = {
  timestamps: true,
}

const quoteSchema = new Schema(structure, options)

class Quotation {
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

  static parseRequestBody(body) {
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

  static jsonSchema() {}
}

quoteSchema.loadClass(Quotation)
quoteSchema.plugin(mongoosePaginate)
const QuoteModel = mongoose.model('Quote', quoteSchema)

module.exports = QuoteModel
