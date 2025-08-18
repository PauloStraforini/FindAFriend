import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
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

  return {
    token,
  }
}
