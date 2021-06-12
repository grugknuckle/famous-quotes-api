const router = require('express').Router()
const checkJWTScopes = require('express-jwt-authz')         // https://github.com/auth0/express-jwt-authz
const Controller = require('./../lib/Controller')
const QuoteModel = require('../models/quote.model')
const Service = require('./../lib/Service')

const controller = new Controller('quotations')
const service = new Service(QuoteModel)
module.exports = router

// TODO ... add request validation middleware (e.g. request body validation)

router.route('/')
  .get(checkJWTScopes([ 'read:quotes' ], {}), async (req, res) => {
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
  .get(checkJWTScopes([ 'read:quotes' ], {}), async (req, res) => {
    try {
      const { status, data, message } = await service.findById(req.params.id, req.query)
      const json = controller.formatResponse(req, res, { status, data, message })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })
  .put(checkJWTScopes([ 'update:quotes' ], {}), async (req, res) => {
    try {
      const { status, message, data } = await service.update(req.body, req.params.id)     
      const json = controller.formatResponse(req, res, { status, data, message })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })
  .delete(checkJWTScopes([ 'delete:quotes' ], {}), async (req, res) => {
    try {
      const { status, message, data } = await service.remove(req.params.id)
      const json = controller.formatResponse(req, res, { status, message, data })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })
  

router.route('/add')
  .post(checkJWTScopes([ 'create:quotes' ], {}), async (req, res) => {
    try {
      const { status, message, data } = await service.create(req.body)
      const json = controller.formatResponse(req, res, { status, data, message })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })
