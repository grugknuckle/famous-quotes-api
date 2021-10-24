const setEnvironment = require('./set-environment')
const fs = require('fs')
const path = require('path')

const environ = setEnvironment()
const options = {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_MGMT_API_ID,
  clientSecret: process.env.AUTH0_MGMT_API_SECRET,
  audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
  scope: 'read:branding update:branding delete:branding'
}
console.log(options)
const ManagementClient = require('auth0').ManagementClient
const management = new ManagementClient(options)

// get()
set()

async function get() {
  console.log('GET new universal login settings and template')
  try {
    const settings = await management.getBrandingSettings()
    console.log(settings)
  } catch (err) {
    console.log('error while getting new universal login settings.')
    console.error(err)
  }

  try {
    const template = await management.getBrandingUniversalLoginTemplate()
    console.log(template)
  } catch (err) {
    console.log('error while getting new universal login template')
    if (err?.statusCode == 404) {
      console.log('Not Found: Template does not exist.')
    } else {
      console.error(err)
    }
  }
}

async function set() {
  try {
    const filename = path.join(__dirname, 'universal-login.html')
    const buffer = fs.readFileSync(filename)
    const template = buffer.toString()
    const json = JSON.stringify({ template })
    const params = {}

    const response = await management.setBrandingUniversalLoginTemplate(params, json)
    console.log('success')
  } catch (err) {
    console.log('error while updating new universal login.')
    console.error(err)
  }
}
