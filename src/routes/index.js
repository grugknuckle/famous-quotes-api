/**
 * An Express.js Application object
 * See the Express.js (documentation)[https://expressjs.com/en/4x/api.html#app]
 * @typedef {Object} ExpressApp
 * @property {Function} use Set resources on the express application
 * @property {Function} listen Start listening to requests
 */

/**
 * Define all express endpoints
 * @param {ExpressApp} app The express application to apply the endpoints to. 
 */
function initialize(app) {
  app.use('/', require('./views'))
  app.use('/api/v1/quotes', require('./quotes'))
}

// TODO ... add authentication middleware


module.exports = {
  initialize
}