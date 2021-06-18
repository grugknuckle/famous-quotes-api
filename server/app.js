const path = require('path')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const serveStatic = require('serve-static')

const { oidcMiddleware } = require('./lib/Auth')
const { routerLogger, errorLogger } = require('./lib/Logger')     // for logging / monitoring

const app = express()

// middleware ...
app.use(express.json()) // body parse json
app.use(routerLogger)   // express-winston logger
app.use(cors())         // TODO: decide if you want a whitelist or just have a global API.
app.use(helmet({        // https://www.npmjs.com/package/helmet
  contentSecurityPolicy: false
}))

// Auth0 middleware for OIDC ... (for protecting admin views)
app.use(oidcMiddleware)

// serve static assets
app.use('/public', serveStatic(path.join(__dirname, 'public')))

// set up routes
app.use('/', require('./routes/views'))
// app.use('/administrator', requiresAuth(), require('./routes/admin'))
app.use('/api/v1/oauth', require('./routes/oauth'))
app.use('/api/v1/quotes', require('./routes/quotes'))
app.use('/api/v1/authors', require('./routes/authors'))
app.use('/', require('./routes/errors'))

// express-winston errorLogger AFTER the other routes have been defined.
app.use(errorLogger)

module.exports = app