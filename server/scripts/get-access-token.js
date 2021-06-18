const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') })
const axios = require('axios');

getAccessToken()

async function getAccessToken() {
  
  const options = {
    method: 'POST',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify({
      client_id: process.env.AUTH0_API_ID,
      client_secret: process.env.AUTH0_API_SECRET,
      audience: 'https://api-quotations.herokuapp.com',
      grant_type: 'client_credentials'
    })
  }

  try {
    const data = await axios(options).then(response => response.data)
    console.log(data)
  } catch (error) {
    console.error(error)
  } finally {
    console.log('Done !')
  }
}
