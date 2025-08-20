import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const response = await request(app.server).post('/pets').send({
      rga: 'RGA12345',
      name: 'Rex',
      dateOfBirth: '2020-01-15',
      castrated: true,
      sex: 'MALE',
      type: 'DOG',
      breed: 'Labrador',
      weight: 12.5,
      weightClass: '6-15kg',
      primaryColor: 'Amarelo',
      about: 'Cachorro brincalhão',
      microchip: 'MIC123456789',
      dateOfApplication: '2020-02-01',
      veterinarian: 'Dr. José',
      manufacturerOfMicrochip: 'PetChip Inc.',
      socialName: null,
      origin: 'Abrigo',
      housing: 'Casa',
      characteristics: 'Amigável',
      orgId: 'org-id-123',
      tutorsId: null,
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create a pet with duplicate RGA', async () => {
    // Primeiro cria o pet
    await request(app.server).post('/pets').send({
      rga: 'RGA99999',
      name: 'Max',
      sex: 'MALE',
      type: 'DOG',
      breed: 'Bulldog',
      about: 'Cachorro dócil',
      orgId: 'org-id-123',
    })

    // Tenta criar novamente com o mesmo RGA
    const response = await request(app.server).post('/pets').send({
      rga: 'RGA99999',
      name: 'Max2',
      sex: 'MALE',
      type: 'DOG',
      breed: 'Bulldog',
      about: 'Outro cachorro',
      orgId: 'org-id-123',
    })

    console.log(response.error)

    expect(response.statusCode).toEqual(409)
    expect(response.body.message).toBe('Pet already exists')
  })
})
