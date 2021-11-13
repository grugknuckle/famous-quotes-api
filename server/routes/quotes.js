const router = require('express').Router()
const { verifyJWT, checkJWTScopes } = require('./../lib/Auth')

const Controller = require('./../lib/Controller')
const Indexer = require('./../lib/Indexer')
const service = require('./../services/QuoteService')
const controller = new Controller('quotations')

const options = {
  customScopeKey: 'permissions',
  failWithError: true
}
module.exports = router

// TODO ... add request validation middleware (e.g. request body validation)

router.route('/index')
  .all(verifyJWT)
  .get(
    checkJWTScopes(['read:quotes'], options),
    async (req, res) => {
      try {
        const { status, message, data } = await service.search(req.query)
        const indexer = new Indexer({ corpus: data.docs, stemmer: req.query.stemmer ?? 'lancaster' })
        const output = {
          status,
          message,
          data: {
            vocabulary: indexer.vocabulary,
            stems: indexer.stems,
            documents: indexer.tfidf.documents
          }
        }
        const json = controller.formatResponse(req, res, output)
        res.status(status).json(json)
      } catch (error) {
        const json = controller.errorHandler(req, res, error)
        res.status(json.status).json(json)
      }
    }
  )

router.route('/')
  .all(verifyJWT)
  .get(
    checkJWTScopes(['read:quotes'], options),
    async (req, res) => {
      try {
        const { status, message, data } = await service.search(req.query)
        const json = controller.formatResponse(req, res, { status, message, data })
        res.status(status).json(json)
      } catch (error) {
        const json = controller.errorHandler(req, res, error)
        res.status(json.status).json(json)
      }
    }
  )
  .post(
    checkJWTScopes(['create:quotes'], options),
    controller.validateRequestBody(service.jsonSchema),
    async (req, res) => {
      try {
        const { status, message, data } = await service.create(req.body)
        const json = controller.formatResponse(req, res, { status, data, message })
        res.status(status).json(json)
      } catch (error) {
        const json = controller.errorHandler(req, res, error)
        res.status(json.status).json(json)
      }
    }
  )

router.route('/:id')
  .all(verifyJWT)
  .get(
    checkJWTScopes(['read:quotes'], options),
    async (req, res) => {
      try {
        const { status, data, message } = await service.findById(req.params.id, req.query)
        const json = controller.formatResponse(req, res, { status, data, message })
        res.status(status).json(json)
      } catch (error) {
        const json = controller.errorHandler(req, res, error)
        res.status(json.status).json(json)
      }
    }
  )
  .delete(
    checkJWTScopes(['delete:quotes'], options),
    async (req, res) => {
      try {
        const { status, message, data } = await service.remove(req.params.id)
        const json = controller.formatResponse(req, res, { status, message, data })
        res.status(status).json(json)
      } catch (error) {
        const json = controller.errorHandler(req, res, error)
        res.status(json.status).json(json)
      }
    }
  )

router.route('/:id')
  .all(verifyJWT)
  .all(controller.validateRequestBody(service.jsonSchema))
  .put(
    checkJWTScopes(['update:quotes'], options),
    async (req, res) => {
      try {
        const { status, message, data } = await service.update(req.body, req.params.id)
        const json = controller.formatResponse(req, res, { status, data, message })
        res.status(status).json(json)
      } catch (error) {
        const json = controller.errorHandler(req, res, error)
        res.status(json.status).json(json)
      }
    }
  )

router.route('/add')
  .all(verifyJWT)
  .all(controller.validateRequestBody(service.jsonSchema))
  .post(
    checkJWTScopes(['create:quotes'], options),
    async (req, res) => {
      try {
        const { status, message, data } = await service.create(req.body)
        const json = controller.formatResponse(req, res, { status, data, message })
        res.status(status).json(json)
      } catch (error) {
        const json = controller.errorHandler(req, res, error)
        res.status(json.status).json(json)
      }
    }
  )
