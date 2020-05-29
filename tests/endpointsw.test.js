const app = require('../app.js')
const supertest = require('supertest')
const request = supertest(app)

describe('Bullets/get/GETALL endpoint Test', () => {
  it('shoul get all bullets', async done => {
    const response = await request.get('/bullets/5ec012ac4775b700040c9d78')
    expect(response.status).toBe(200)
    done()
  })
})

describe('Bullets/get/GEMONTH endpoint Test', () => {
  it('shoul get monthly bullets', async done => {
    const response = await request.get('/bullets/5ec012ac4775b700040c9d78/month/2')
    expect(response.status).toBe(200)
    done()
  })
})

describe('Bullets/get/GETWEEK endpoint Test', () => {
  it('shoul get weekly bullets', async done => {
    const response = await request.get('/bullets/5ec012ac4775b700040c9d78/week/22')
    expect(response.status).toBe(200)
    done()
  })
})

describe('Bullets/get/GETDAY endpoint Test', () => {
  it('shoul get daily bullets', async done => {
    const response = await request.get('/bullets/5ec012ac4775b700040c9d78/1/1')
    expect(response.status).toBe(200)
    done()
  })
})

describe('Bullets/get/GETONE endpoint Test', () => {
  it('shoul get one bullet', async done => {
    const response = await request.get('/bullets/5ec012ac4775b700040c9d78/5eceb6cc00b55300040e2f1f')
    expect(response.status).toBe(200)
    done()
  })
})

describe('Goals/get/GETALL endpoint Test', () => {
  it('shoul get all Goals', async done => {
    const response = await request.get('/goals/5ec012ac4775b700040c9d78')
    expect(response.status).toBe(200)
    done()
  })
})

describe('Goals/get/GETACTIVES endpoint Test', () => {
  it('shoul get all Goals ACTIVE', async done => {
    const response = await request.get('/goals/5ec012ac4775b700040c9d78/active')
    expect(response.status).toBe(200)
    done()
  })
})

describe('Goals/get/GETACOPLETED endpoint Test', () => {
  it('shoul get all Goals COMPLETED', async done => {
    const response = await request.get('/goals/5ec012ac4775b700040c9d78/completed')
    expect(response.status).toBe(200)
    done()
  })
})

describe('Goals/get/GETACANCELLED endpoint Test', () => {
  it('shoul get all Goals CANCELLED', async done => {
    const response = await request.get('/goals/5ec012ac4775b700040c9d78/cancelled')
    expect(response.status).toBe(200)
    done()
  })
})