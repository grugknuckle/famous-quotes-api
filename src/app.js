const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { auth, requiresAuth } = require('express-openid-connect')
const { routerLogger, errorLogger } = require('./lib/Logger')

const app = express()

// middleware ...
app.use(express.json()) // body parse json
app.use(routerLogger)   // express-winston logger
// app.use(cors())         // https://www.npmjs.com/package/cors ... TODO: decide if you want a whitelist or just have a global API.
app.use(helmet())       // https://www.npmjs.com/package/helmet

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
app.use('/api/v1/oauth', requiresAuth(), require('./routes/oauth'))
app.use('/api/v1/quotes', requiresAuth(), cors(), require('./routes/quotes'))
app.use('/api/v1/authors', requiresAuth(), cors(), require('./routes/authors'))
app.use('/', require('./routes/errors'))

// express-winston errorLogger AFTER the other routes have been defined.
app.use(errorLogger)

module.exports = app