const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema
const Quote = require('./../definitions/Quote')

//https://mongoosejs.com/docs/schematypes.html#schematype-options

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
quoteSchema.loadClass(Quote)
quoteSchema.plugin(mongoosePaginate)
const QuoteModel = mongoose.model('Quote', quoteSchema)

module.exports = QuoteModel
