const path = require('path')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const serveStatic = require('serve-static')

const { auth, requiresAuth } = require('express-openid-connect')  // for protecting admin views
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')                                  // for protecting api endpoints
const { routerLogger, errorLogger } = require('./lib/Logger')     // for logging / monitoring

const app = express()

// middleware ...
app.use(express.json()) // body parse json
app.use(routerLogger)   // express-winston logger
// app.use(cors())         // TODO: decide if you want a whitelist or just have a global API.
app.use(helmet({        // https://www.npmjs.com/package/helmet
  contentSecurityPolicy: false
}))

// Auth0 middleware for OIDC ... (for protecting admin views)
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

// JWT checker
const verifyJWT = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `${process.env.AUTH0_ISSUER_BASE_URL}/`,
  algorithms: ['RS256']
})

// serve static assets
app.use('/public', serveStatic(path.join(__dirname, 'public')))

// set up routes
app.use('/', require('./routes/views'))
// app.use('/administrator', requiresAuth(), require('./routes/admin'))
app.use('/api/v1/oauth', requiresAuth(), require('./routes/oauth'))
app.use('/api/v1/quotes', cors(), verifyJWT, require('./routes/quotes'))
app.use('/api/v1/authors', cors(), verifyJWT, require('./routes/authors'))
app.use('/', require('./routes/errors'))

// express-winston errorLogger AFTER the other routes have been defined.
app.use(errorLogger)

module.exports = app