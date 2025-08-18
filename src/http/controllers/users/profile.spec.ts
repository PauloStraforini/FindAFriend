import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user Profile', async () => {
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

    const authResponse = await request(app.server).post('/sessions').send({
      registration: 'ABC113',
      password: '123456',
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        registration: 'ABC113',
      }),
    )
  })
})
