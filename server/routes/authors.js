const router = require('express').Router()
const { verifyJWT, checkJWTScopes } = require('./../lib/Auth')

const Controller = require('./../lib/Controller')
const service = require('./../services/AuthorService')
const controller = new Controller('quotations')

const options = {
  customScopeKey: 'permissions',
  failWithError: true
}
module.exports = router

router.route('/')
  // .all(verifyJWT)
  .get(
    // checkJWTScopes([ 'read:authors' ], { failWithError: true }),
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

router.route('/:id')
  // .all(verifyJWT)
  .get(
    // checkJWTScopes([ 'read:authors' ], { failWithError: true }),
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
    // checkJWTScopes([ 'delete:authors' ], options),
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
  .all(controller.validateRequestBody(service.jsonSchema))
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
