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

// define fields
const quoteSchema = new Schema({
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
  },
  {
    timestamps: true,
  })

quoteSchema.methods.format = function () {
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

quoteSchema.plugin(mongoosePaginate)
const Quote = mongoose.model('Quote', quoteSchema)



module.exports = Quote
