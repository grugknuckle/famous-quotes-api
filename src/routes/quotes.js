const router = require('express').Router()
const Controller = require('./../lib/Controller')
const QuoteService = require('../database/services/QuoteService')

const controller = new Controller('quotations')
const service = new QuoteService()
module.exports = router

// TODO ... add request validation middleware
// TODO ... add route parameters

router.route('/')
  .get(async (req, res) => {
    console.log(service.model)
    try {
      const { status, message, data } = await service.search(req.query)
      const json = controller.formatResponse(req, res, { status, message, data })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })

router.route('/:id')
  .get(async (req, res) => {
    try {
      const { status, data, message } = await service.findById(req.params.id)
      const json = controller.formatResponse(req, res, { status, data, message })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })
  .delete(async (req, res) => {
    try {
      const { status, message, data } = await service.remove(req.params.id)
      const json = controller.formatResponse(req, res, { status, message, data })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })
  .put(async (req, res) => {
    try {
      const { status, message, data } = await service.update(req.body, req.params.id)     
      const json = controller.formatResponse(req, res, { status, data, message })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })

router.route('/add')
  .post(async (req, res) => {
    try {
      const { status, message, data } = await service.create(req.body)
      const json = controller.formatResponse(req, res, { status, data, message })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })
