const router = require('express').Router()
const Controller = require('./../lib/Controller')
const controller = new Controller('authentication')

module.exports = router

router.route('/profile')
  .get((req, res, next) => {
    /*
    {
      "given_name": "Grugknuckle",
      "nickname": "aaron.wolbach",
      "name": "Grugknuckle",
      "picture": "https://lh3.googleusercontent.com/a-/AOh14Gi6st5CMrFLeOP0PbPzlB6lIG7MX_PcIY9JOsVpTQ=s96-c",
      "locale": "en",
      "updated_at": "2021-05-28T19:22:43.612Z",
      "email": "aaron.wolbach@gmail.com",
      "email_verified": true,
      "sub": "google-oauth2|117305745212471508481"
    }
    */
    try {
      const json = controller.formatResponse(req, res, { status: 200, message: 'Authenticated user profile', data: req.oidc.user })
      res.status(200).json(json)
    } catch (error) {
      const json = controller.errorHandler(req, res, error)
      res.status(json.status).json(json)
    }
  })

router.route('/userinfo')
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