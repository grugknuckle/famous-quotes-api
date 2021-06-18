const router = require('express').Router()
const { verifyJWT, checkJWTScopes } = require('./../lib/Auth')

const Controller = require('./../lib/Controller')
const AuthorModel = require('../models/author.model')
const Service = require('./../lib/Service')

const controller = new Controller('authors')
const service = new Service(AuthorModel)
const options = {
  customScopeKey: 'permissions',
  failWithError: true
}
module.exports = router

router.route('/')
  .all(verifyJWT)
  .get(checkJWTScopes([ 'read:authors' ], options), async (req, res) => {
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
  .all(verifyJWT)
  .get(checkJWTScopes([ 'read:authors' ], options), async (req, res) => {
    try {
      const { status, data, message } = await service.findById(req.params.id, req.query)
      const json = controller.formatResponse(req, res, { status, data, message })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })
  .delete(checkJWTScopes([ 'delete:authors' ], options),async (req, res) => {
    try {
      const { status, message, data } = await service.remove(req.params.id)
      const json = controller.formatResponse(req, res, { status, message, data })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })
  

router.route('/:id')
  .all(verifyJWT)
  .all(controller.validateRequestBody(AuthorModel.jsonSchema()))
  .put(checkJWTScopes([ 'update:authors' ], options), async (req, res) => {
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
  .all(verifyJWT)
  .all(controller.validateRequestBody(AuthorModel.jsonSchema()))
  .post(checkJWTScopes([ 'create:authors' ], options), async (req, res) => {
    try {
      const { status, message, data } = await service.create(req.body)
      const json = controller.formatResponse(req, res, { status, data, message })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })
