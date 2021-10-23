const path = require('path')
const args = process.argv.slice(2)
const environ = args[0] ?? 'dev'

module.exports = function () {
  if ([ 'dev', 'local', 'prod' ].includes(environ)) {
    console.log(`Reading environment from .env.${environ}`)
    require('dotenv').config({ path: path.join(__dirname, `../.env.${environ}`) })
  } else {
    console.log(`the .env.${environ} file was not found`)
    console.log('exiting process.')
    console.log('')
    process.exit(1)
  }
  return environ
}
