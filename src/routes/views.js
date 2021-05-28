const router = require('express').Router()

module.exports = router

router
  .route('/')
  .get((req, res) => {
    const json = {
      isAuthenticated: req.oidc.isAuthenticated(),
      message: 'Hello from the Famous Quotations API!'
    }

    res.status(200).json(json)
  })