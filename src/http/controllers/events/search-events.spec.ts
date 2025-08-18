import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '../../../../utils/create-and-authenticate-user'

describe('Create Event (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an Event', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Paulo Gym',
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
        email: 'admin@example.com',
        phone: '11999999999',
        acceptedAnimalTypes: ['Dog', 'Cat'],
        acceptedSexes: ['Male', 'Female'],
        excludedBreeds: [],
        dateOfEvent: new Date(),
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // +2h
        totalVacancies: 50,
        registered: 'admin',
      })

    await request(app.server)
      .post('/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Paulo Gym',
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
        email: 'admin@example.com',
        phone: '11999999999',
        acceptedAnimalTypes: ['Dog', 'Cat'],
        acceptedSexes: ['Male', 'Female'],
        excludedBreeds: [],
        dateOfEvent: new Date(),
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // +2h
        totalVacancies: 50,
        registered: 'admin',
      })

    const response = await request(app.server)
      .get('/events/search')
      .query({
        q: 'Paulo',
      })
      .set('Authorization', `Bearer. ${token}`)
      .send()

    console.log(response.error)
    expect(response.statusCode).toEqual(200)
    expect(response.body.events).toHaveLength(1)
    expect(response.body.events).toEqual([
      expect.objectContaining({
        title: 'Paulo Gym',
      }),
    ])
  })
})
