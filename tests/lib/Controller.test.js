const Controller = require('./../../server/lib/Controller')

describe('Controller class ...', () => {
  describe('constructor', () => {
    it.todo('sets the name property to the passed string parameter')
    it.todo('if no param is passed to constructor, it sets the name property "default"')
  })

  describe('static properties', () => {
    describe('httpCodes', () => {
      it.todo('is defined and is static')
      it.todo('returns a hashmap of http status codes and their status messages')
    })
    
    describe('cruds', () => {
      it.todo('is defined and is static')
      it.todo('returns a hashmap of Create/Read/Update/Delete to GET/PUT/POST/DELETE verbs')
    })
  })

  describe('instance properties', () => {
    describe('name', () => {
      it.todo('is defined and is NOT static')
      it.todo('returns the name of the controller')
    })
    
    describe('cruds', () => {
      it.todo('is defined and is static')
      it.todo('returns a hashmap of Create/Read/Update/Delete to GET/PUT/POST/DELETE verbs')
    })
  })

  describe('static methods', () => {
    describe('formatResponse', () => {
      it.todo('is defined and is static')
    })

    describe('errorHandler', () => {
      it.todo('is defined and is static')
    })
  })
})