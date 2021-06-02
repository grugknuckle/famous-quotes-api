const express = require('express')
const { auth, requiresAuth } = require('express-openid-connect')
const { routerLogger, errorLogger } = require('./lib/Logger')

const app = express()

// middleware ...
app.use(express.json()) // body parse json
app.use(routerLogger)   // express-winston logger

// Auth0 middleware
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

// set up routes
app.use('/', require('./routes/views'))
app.use('/oauth', requiresAuth(), require('./routes/oauth'))
app.use('/api/v1/quotes', requiresAuth(), require('./routes/quotes'))
app.use('/', require('./routes/errors'))

// express-winston errorLogger AFTER the other routes have been defined.
app.use(errorLogger)

module.exports = app