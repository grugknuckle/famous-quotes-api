/**
 * An Express.js Application object
 * See the Express.js (documentation)[https://expressjs.com/en/4x/api.html#app]
 * @typedef {Object} ExpressApp
 * @property {Function} use Set resources on the express application
 * @property {Function} listen Start listening to requests
 */

 const { auth, requiresAuth } = require('express-openid-connect')

/**
 * Define all express endpoints
 * @param {ExpressApp} app The express application to apply the endpoints to. 
 */
function initialize(app) {

  // examples ... https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md
  app.use(
    auth({
      authRequired: false,
      auth0Logout: true,
      issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
      baseURL: process.env.BASE_URL,
      clientID: process.env.AUTH0_CLIENT_ID,
      secret: process.env.AUTH0_SECRET,
      idpLogout: true,
    })
  )

  app.use('/', require('./views'))
  app.use('/oauth', require('./oauth'))
  app.use('/api/v1/quotes', requiresAuth(), require('./quotes'))
}

// TODO ... add authentication middleware

module.exports = {
  initialize
}