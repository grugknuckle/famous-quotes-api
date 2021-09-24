const router = require('express').Router()
const { requiresAuth, requestAccessToken } = require('./../lib/Auth')

const Controller = require('./../lib/Controller')
const controller = new Controller('authentication')

module.exports = router

router.route('/profile')
  .all(requiresAuth())
  .get((req, res, next) => {
    try {
      const json = controller.formatResponse(req, res, { status: 200, message: 'Authenticated user profile', data: req.oidc.user })
      res.status(200).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })

router.route('/userinfo')
  .all(requiresAuth())
  .get(async (req, res) => {
    try {
      const data = await req.oidc.fetchUserInfo()
      const json = controller.formatResponse(req, res, { status: 200, message: 'Authenticated user info', data })
      res.status(200).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })

router.route('/token')
  .get(async (req, res) => {
    try {
      const data = await requestAccessToken().then(response => response.data)
      res.status(200).json(data)
    } catch (error) {
      const response = {
        method: req.method.toUpperCase(),
        resource: req.baseUrl,
        success: false,
        status: 401,
        statusText: 'UNAUTHORIZED',
        message: error.message,
        data: {
          stack: error.stack
        }
      }
      res.status(response.status).json(response)
    }
  })
