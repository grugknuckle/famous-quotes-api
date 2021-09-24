const router = require('express').Router()
const Controller = require('./../lib/Controller')
const controller = new Controller('home')

module.exports = router

router
  .route('/')
  .get((req, res) => {
    try {
      const status = 200
      const message = 'This is a protected administrator route.'
      const data = {
        isAuthenticated: req.oidc.isAuthenticated(),
        identity: req.oidc.user,
        claims: req.oidc.idTokenClaims
      }
      const json = controller.formatResponse(req, res, { status, message, data })
      res.status(status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })
