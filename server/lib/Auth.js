const { auth, requiresAuth } = require('express-openid-connect')
const checkJWTScopes = require('express-jwt-authz')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')   

// OIDC middleware
const oidcMiddleware = auth({
  authRequired: false,
  auth0Logout: true,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  secret: process.env.AUTH0_CLIENT_SECRET,
  idpLogout: true,
})

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

function enforceHTTPS(req, res, next) {
  const scheme = req.headers['x-forwarded-proto']
  const host = req.headers.host
  const url = req.url
  if (scheme !== 'https') {
    res.redirect(`https://${host}${url}`)
  } else {
    next()
  }
}

module.exports = {
  oidcMiddleware,
  verifyJWT,
  requiresAuth,
  checkJWTScopes,
  enforceHTTPS
}