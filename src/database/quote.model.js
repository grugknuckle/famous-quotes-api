const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
  },
  // tags: {},
  likes: {
    type: Number
  },
  dislikes: {
    type: Number
  }
},
{
  timestamps: true,
})

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote


/*
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