const router = require('express').Router()
const QuoteController = require('./../controllers/QuoteController')
const controller = new QuoteController()

module.exports = router

// TODO ... add request validation middleware
// TODO ... add route parameters

router.route('/')
  .get((req, res) => controller.search(req, res))

router.route('/:id')
  .get((req, res) => controller.findById(req, res))
  .delete((req, res) => controller.remove(req, res))
  .put((req, res) => controller.update(req, res))

router.route('/add')
  .post((req, res) => controller.create(req, res))
