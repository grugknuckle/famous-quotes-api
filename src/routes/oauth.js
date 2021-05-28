const router = require('express').Router()
const { requiresAuth } = require('express-openid-connect')

module.exports = router

router.route('/profile')
  .get((req, res) => {
    res.json(req.oidc.user)
  })