import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Tutors (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an Tutors', async () => {
    const response = await request(app.server)
      .post('/tutors')
      .send({
        username: 'João da Silva',
        cpf: '12345678901',
        email: 'joao.silva@example.com',
        phoneNumber: '15999998888',
        gender: 'MALE',
        dateOfBirth: new Date('1985-10-20'),
        cep: '18010000',
        street: 'Rua da Penha',
        numberHouse: '500',
        neighborhood: 'Centro',
        city: 'Sorocaba',
        about: 'Tutor responsável e cuidadoso.',
        cnpj: '',
        socialName: '',
        age: '',
        uniqueCard: '',
        complement: '',
        nameEmergencyContact: '',
        phoneNumberEmergency: '',
        pets: '',
      })

    expect(response.statusCode).toEqual(201)
  })
})
