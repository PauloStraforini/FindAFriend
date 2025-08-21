import request from 'supertest'
import { app } from '../../../app' // seu Fastify app
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Update Event (E2E)', () => {
  let createdEventId: string

  beforeAll(async () => {
    await app.ready()

    // Criar um evento inicial para depois atualizar
    const response = await request(app.server).post('/events').send({
      title: 'Evento Teste',
      description: 'Descrição teste',
      statsOfEvent: 'PENDING',
      latitude: 10,
      longitude: 20,
      cep: '12345678',
      street: 'Rua Teste',
      neighborhood: 'Bairro Teste',
      numberHouse: '100',
      authorName: 'Autor Teste',
      email: 'teste-update@teste.com',
      phone: '999999999',
      totalVacancies: 50,
    })

    createdEventId = response.body.id
  })

  afterAll(async () => {
    await app.close()
  })

  it('should update an event successfully', async () => {
    const updateData = {
      title: 'Evento Atualizado',
      description: 'Descrição atualizada',
      statsOfEvent: 'ACTIVE',
      totalVacancies: 100,
    }

    const response = await request(app.server)
      .put(`/events/${createdEventId}`)
      .send(updateData)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ success: true })
  })

  it('should return 400 for invalid UUID', async () => {
    const response = await request(app.server)
      .put(`/events/invalid-uuid`)
      .send({ title: 'Teste' })

    expect(response.status).toBe(400)
  })
})
