import request from 'supertest'
import { app } from '../../../app'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import { makeCreateEventUseCase } from '../../../use-cases/factories/make-create-event-use-case'
import { prisma } from '../../../lib/prisma' // seu client Prisma

describe('Delete Event (E2E)', () => {
  let eventId: string

  beforeAll(async () => {
    await app.ready()

    const createEventUseCase = makeCreateEventUseCase()
    await createEventUseCase.execute({
      title: 'Evento Teste',
      description: 'Descrição teste',
      statsOfEvent: 'PENDING',
      latitude: 10,
      longitude: 10,
      cep: '12345678',
      street: 'Rua Teste',
      neighborhood: 'Bairro Teste',
      numberHouse: '123',
      complement: null,
      authorName: 'Autor Teste',
      email: 'teste-delete@teste.com',
      phone: '123456789',
      acceptedAnimalTypes: ['DOG', 'CAT'],
      acceptedSexes: ['MALE', 'FEMALE'],
      excludedBreeds: ['RAÇA TESTE'],
      dateOfEvent: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      totalVacancies: 10,
      registered: '0',
    })

    const event = await prisma.event.findUnique({
      where: { email: 'teste-delete@teste.com' },
    })

    if (!event) throw new Error('Evento não foi criado')
    eventId = event.id
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete an event successfully', async () => {
    const response = await request(app.server)
      .delete(`/events/${eventId}`)
      .send()

    expect(response.status).toBe(204)
  })
})
