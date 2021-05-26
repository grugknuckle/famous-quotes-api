const router = require('express').Router()
let Quote = require('../database/models/quote.model')

module.exports = router

router
  .route('/')
  .get((req, res) => {
    res.json('Hello from the Quote API!')
  })