const router = require('express').Router()
let controller = require('./../controllers/quotes')

module.exports = router

// TODO ... add request validation middleware
// TODO ... add route parameters

router.route('/')
  .get(controller.search)

router.route('/:id')
  .get(controller.findById)
  .delete(controller.remove)
  .put(controller.update)

router.route('/add')
  .post(controller.create)
