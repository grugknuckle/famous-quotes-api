const QuoteController = require('./../../src/controllers/QuoteController')

describe('QuoteController class ...', () => {
  describe('constructor', () => {
    it.todo('sets the name property to "quotations"')
    it.todo('calls the "super" function')
  })

  describe('instance methods', () => {
    let controller
    beforeAll(() => {
      controller = new QuoteController()
    })

    describe('search', () => {
      it('is defined and is NOT static', () => {
        expect(controller.search).toBeDefined()
        expect(controller.search).toBeInsanceOf(Function)
        expect(QuoteController.search).not.toBeDefined()
      })
      it.todo('is an async function')
    })

    describe('findById', () => {
      it('is defined and is NOT static', () => {
        expect(controller.findById).toBeDefined()
        expect(controller.findById).toBeInsanceOf(Function)
        expect(QuoteController.findById).not.toBeDefined()
      })
      it.todo('is an async function')
    })

    describe('create', () => {
      it('is defined and is NOT static', () => {
        expect(controller.create).toBeDefined()
        expect(controller.create).toBeInsanceOf(Function)
        expect(QuoteController.create).not.toBeDefined()
      })
      it.todo('is an async function')
    })

    describe('update', () => {
      it('is defined and is NOT static', () => {
        expect(controller.update).toBeDefined()
        expect(controller.update).toBeInsanceOf(Function)
        expect(QuoteController.update).not.toBeDefined()
      })
      it.todo('is an async function')
    })

    describe('remove', () => {
      it('is defined and is NOT static', () => {
        expect(controller.remove).toBeDefined()
        expect(controller.remove).toBeInsanceOf(Function)
        expect(QuoteController.remove).not.toBeDefined()
      })
      it.todo('is an async function')
    })
  })
})