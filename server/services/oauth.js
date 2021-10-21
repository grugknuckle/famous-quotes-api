const axios = require('axios')

module.exports = {
  requestAccessToken
}

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
