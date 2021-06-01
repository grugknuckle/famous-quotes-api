// const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema, model } = require('mongoose')
const Quote = require('./../definitions/Quote')

//https://mongoosejs.com/docs/schematypes.html#schematype-options

const structure = {
  text: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  author: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    index: true,
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
const QuoteModel = model('Quote', quoteSchema)

module.exports = QuoteModel
