import request from 'supertest'
import { app } from '../../../app'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { prisma } from '../../../lib/prisma'

describe('Update Event (e2e)', () => {
  let eventId: string

  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    const event = await prisma.event.create({
      data: {
        title: 'JavaScript Gym',
        description: 'Some description.',
        statsOfEvent: 'PENDING',
        latitude: -27.2092052,
        longitude: -49.6401091,
        cep: '88000000',
        street: 'Rua do Evento',
        neighborhood: 'Centro',
        numberHouse: '123',
        complement: null,
        authorName: 'Admin',
        email: 'addd@example.com',
        phone: '11999999999',
        acceptedAnimalTypes: ['Dog', 'Cat'],
        acceptedSexes: ['Male', 'Female'],
        excludedBreeds: [],
        dateOfEvent: new Date(),
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        totalVacancies: 50,
        registered: 'admin',
      },
    })

    eventId = event.id
  })

  console.log()

  it('should be able to update an Event', async () => {
    const response = await request(app.server).put(`/events/${eventId}`).send({
      title: 'Updated JavaScript Gym',
    })

    console.log()

    expect(response.statusCode).toEqual(200)
  })
})