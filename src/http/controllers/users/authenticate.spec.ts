import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to Authenticate', async () => {
    await request(app.server)
      .post('/users')
      .send({
        username: 'Paulo Straforini',
        email: 'paula@example.com',
        cpf: '12345678910',
        registration: 'ABC113',
        password: '123456',
        dateOfBirth: new Date('1990-01-01'),
        position: 'ADMIN',
      })

    const response = await request(app.server).post('/sessions').send({
      registration: 'ABC113',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
