import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '../../../lib/prisma'

describe('Create Pet (e2e)', () => {
  let tutorId: string

  beforeAll(async () => {
    await app.ready()

    // Criar tutor antes dos pets
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
    // Limpar dados criados
    await prisma.pet.deleteMany()
    await prisma.tutors.deleteMany()

    await app.close()
  })

  it('should be able to create Pets and search them', async () => {
    // Criar primeiro pet
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
      nameEmergencyContact: null,
      phoneNumberEmergency: null,
      cep: null,
      street: null,
      numberHouse: null,
      neighborhood: null,
      city: null,
    })

    expect(createResponse1.statusCode).toBe(201)

    // Criar segundo pet
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
      nameEmergencyContact: null,
      phoneNumberEmergency: null,
      cep: null,
      street: null,
      numberHouse: null,
      neighborhood: null,
      city: null,
    })

    expect(createResponse2.statusCode).toBe(201)

    // Buscar pets
    const searchResponse = await request(app.server)
      .get('/pets/search')
      .query({ q: 'Fido' })
      .send()

    expect(searchResponse.statusCode).toEqual(200)
    expect(searchResponse.body.pets).toHaveLength(2)
    expect(searchResponse.body.pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Fido' })]),
    )
  })
})
