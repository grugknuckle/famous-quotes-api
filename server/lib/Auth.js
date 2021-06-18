const { auth, requiresAuth } = require('express-openid-connect')  // for protecting admin views
const checkJWTScopes = require('express-jwt-authz')         // https://github.com/auth0/express-jwt-authz
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')   
const axios = require('axios');

async function requestAccessToken() {
  const options = {
    method: 'POST',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    headers: {
      'content-type': 'application/json'
      // 'content-type': 'application/x-www-form-urlencoded'
    },
    data: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_API_ID,
      client_secret: process.env.AUTH0_API_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
    })
  }
  return await axios(options)
}

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

module.exports = {
  requestAccessToken,
  oidcMiddleware,
  verifyJWT,
  requiresAuth,
  checkJWTScopes
}