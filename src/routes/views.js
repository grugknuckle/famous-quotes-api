const router = require('express').Router()
const Controller = require('./../lib/Controller')
const controller = new Controller('home')
const specification = require('./../api-specs')

module.exports = router

router
  .route('/')
  .get((req, res) => {
    try {
      const status = 200
      const message = 'Hello from the Famous Quotations API!'
      const data = {
        isAuthenticated: req.oidc.isAuthenticated()
      }
      const json = controller.formatResponse(req, res, { status, message, data })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })

// TODO: if the user is authenticated and has an administrator role, show the FULL api-specification.
router
  .route('/api/v1/specification')
  .get((req, res) => {
    try {
      const status = 200
      res.status(status).json(specification)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })