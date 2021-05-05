const router = require('express').Router()
let Quote = require('../database/quote.model')

module.exports = router

router
  .route('/')
  .get((req, res) => {
    Quote.find()
      .then(quotes => res.json(quotes))
      .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add')
  .post((req, res) => {
    const text = req.body.text
    const newUser = new Quote({ text })

    newUser.save()
        .then(() => res.json('Quote added!'))
        .catch(err => res.status(400).json('Error: ' + err))
  })

router.route('/:id')
  .get((req, res) => {
    Quote.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err))
  })

router.route('/:id')
  .delete((req, res) => {
    Quote.findByIdAndDelete(req.params.id)
        .then(() => res.json('Quote deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
  })

router.route('/:id')
  .put((req, res) => {
    Quote.findById(req.params.id)
        .then(quote => {
            quote.text = req.body.text

            quote.save()
                .then(() => res.json('Quote updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
  })