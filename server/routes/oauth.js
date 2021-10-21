const router = require('express').Router()
const { requiresAuth } = require('./../lib/Auth')
const service = require('./../services/oauth')

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
      const response = {
        status: 200,
        message: 'Authenticated user info',
        data
      }
      const json = controller.formatResponse(req, res, response)
      res.status(response.status).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })

router.route('/token')
  .get(async (req, res) => {
    try {
      const data = await service.requestAccessToken().then(response => response.data)
      res.status(200).json(data)
    } catch (error) {
      const response = {
        status: 401,
        message: error.message,
        data: {
          stack: error.stack
        }
      }
      const json = controller.formatResponse(req, res, response)
      res.status(response.status).json(json)
    }
  })
