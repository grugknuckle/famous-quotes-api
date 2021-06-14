/**
 * This module generates the documentation object from the config variables and returns it to be parsed
 * by the swagger-ui library later on in the code.
 */
const path = require('path')
const fs = require('fs')
const { content } = require('./responses')

const description = fs.readFileSync(path.join(__dirname, 'description.md'), { encoiding: 'utf8' })

// https://swagger.io/specification
let specification = {
  openapi: '3.0.3',
  info: {
    title: 'Famous Quotations API',
    description: description.toString('utf8'),
    termsOfService: `${process.env.BASE_URL}/terms`,
    contact: {
      name: 'Aaron Wolbach',
      email: 'aaron.wolbach@gmail.com',
      url: `${process.env.BASE_URL}/support`
    },
    license: {
      name: 'UNLICENSED',
      // 'https://opensource.org/licenses/MIT'
      url: 'https://choosealicense.com/licenses/',
    },
    version: '1.0.1',
    'x-logo': {
      url: '/public/images/Quoted-Logo-2.svg',
      altText: 'Quotes-API'
    }
  },
  servers: [
    {
      url: `https://adawg.production/api/v1`,
      description: `Production server`
    },
    {
      url: `https://localhost:5000/api/v1`,
      description: `Local Development server`
    }
  ],
  paths: require('./paths'),
  components: {
    schemas: require('./schemas'),
    parameters: require('./parameters'),
    // securitySchemes: {
    //   ApiKey: {
    //     type: 'apiKey',
    //     in: 'header',
    //     name: 'Authorization',
    //     description: 'Authorization token',
    //   },
    // },
    requestBodies: require('./requests'),
    responses: {
      '200': { description: 'OK', content: content() },
      '201': { description: 'CREATED', content: content() },
      '204': { description: 'NO CONTENT', content: content() },
      '304': { description: 'NOT MODIFIED', content: content() },
      '400': { description: 'BAD REQUEST', content: content() },
      '401': { description: 'UNAUTHORIZED', content: content() },
      '403': { description: 'FORBIDDEN', content: content() },
      '404': { description: 'NOT FOUND', content: content() },
      // '500': { description: 'SERVER ERROR', content: content({ '$ref': '#/components/schemas/netsuiteError' }) },
      '501': { description: 'NOT IMPLEMENTED', content: content() },
    },
    // headers: {},
    // examples: {}
    // links: {},
    // callbacks: {}
  },
  // security: [{ ApiKey: [] }],
  tags: require('./tags').tags,
  'x-tagGroups': require('./tags')['x-tagGroups'],
}

module.exports = specification
