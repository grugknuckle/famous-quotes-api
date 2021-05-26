require('dotenv').config()
const mongoose = require('mongoose')
const uri = process.env.DB_CONNECTION_STRING

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection



const data = {
  text: 'You can fool all the people some of the time, and some of the people all the time, but you cannot fool all the people all the time.',
  author: 'Abraham Lincoln',
  citation: '\'Abraham Lincoln Quotes.\' BrainyQuote.com. BrainyMedia Inc, 2021. 1 March 2021. https://www.brainyquote.com/quotes/abraham_lincoln_110340',
  source: 'https://www.brainyquote.com/quotes/abraham_lincoln_110340',
  tags: [],
  likes: 0,
  dislikes: 0
}

connection.once('open', open)

async function open() {
  console.log('MongoDB database connection established successfully')

}