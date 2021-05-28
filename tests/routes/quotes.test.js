const request = require('supertest')

describe('GET /api/v1/quotes', () => {
  it('responds with json', () => {
    request('/api/v1/quotes')
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.status).toBe(200)
      })
  })
})