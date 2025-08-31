import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { prisma } from '../../../lib/prisma'

describe('Create and Search Pets (e2e)', () => {
  let tutorId: string

  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    await prisma.pet.deleteMany()
    await prisma.tutors.deleteMany()

    const tutor = await prisma.tutors.create({
      data: {
        username: 'Joao',
        cpf: '12345678901',
        phoneNumber: '11999999999',
        gender: 'MALE',
        email: 'joao@email.com',
      },
    })

    tutorId = tutor.id
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create pets and search them by name', async () => {
    const createResponse1 = await request(app.server).post('/pets').send({
      name: 'Paulinho',
      rga: '222123456799',
      dateOfBirth: '2018-06-15',
      age: '5',
      sex: 'MALE',
      type: 'DOG',
      breed: 'Labrador',
      weight: 20,
      weightClass: '15-30kg',
      primaryColor: 'Amarelo',
      about: 'Cachorro amigável e brincalhão',
      microchip: '1I1R1C1I9123',
      dateOfApplication: '2018-06-20',
      veterinarian: 'Dr. João Silva',
      manufacturerOfMicrochip: 'VetChip',
      socialName: 'Fidinho',
      origin: 'Abrigo Municipal',
      housing: 'Casa com quintal',
      characteristics: 'Muito ativo e carinhoso',
      tutorsId: tutorId,
      castrated: false,
    })

    expect(createResponse1.statusCode).toBe(201)

    const createResponse2 = await request(app.server).post('/pets').send({
      name: 'Fido',
      rga: 'RGA123456789',
      dateOfBirth: '2018-06-15',
      age: '5',
      sex: 'MALE',
      type: 'DOG',
      breed: 'Labrador',
      weight: 20,
      weightClass: '15-30kg',
      primaryColor: 'Amarelo',
      about: 'Cachorro amigável e brincalhão',
      microchip: 'MICROCHIP123',
      dateOfApplication: '2018-06-20',
      veterinarian: 'Dr. João Silva',
      manufacturerOfMicrochip: 'VetChip',
      socialName: 'Fidinho',
      origin: 'Abrigo Municipal',
      housing: 'Casa com quintal',
      characteristics: 'Muito ativo e carinhoso',
      tutorsId: tutorId,
      castrated: false,
    })

    expect(createResponse2.statusCode).toBe(201)

    const searchResponse = await request(app.server)
      .get('/pets/search')
      .query({ q: 'fido' })
      .expect(200)

    // Deve retornar apenas 1 pet (o Fido)
    expect(searchResponse.body.pets).toHaveLength(1)
    expect(searchResponse.body.pets[0]).toEqual(
      expect.objectContaining({ name: 'Fido' }),
    )
  })
})
