import { InMemoryTutorsRepository } from '../../repositories/in-memory/in-memory-tutors-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchTutorsUseCase } from './search-tutors'

let tutorsRepository: InMemoryTutorsRepository
let sut: SearchTutorsUseCase

describe('Search Tutors Use Case', () => {
  beforeEach(() => {
    tutorsRepository = new InMemoryTutorsRepository()
    sut = new SearchTutorsUseCase(tutorsRepository)
  })

  it('should be able to search for tutors by username', async () => {
    await tutorsRepository.create({
      cpf: '12345678901',
      username: 'rex123',
      socialName: 'Rex Feliz',
      email: 'rex@teste.com',
      dateOfBirth: null,
      phoneNumber: '11999999999',
      gender: 'MALE',
      uniqueCard: null,
      about: 'Tutor super dedicado!',
      cep: null,
      street: null,
      numberHouse: null,
      complement: null,
      neighborhood: null,
      city: null,
      nameEmergencyContact: null,
      phoneNumberEmergency: null,
    })

    await tutorsRepository.create({
      cpf: '98765432100',
      username: 'maria456',
      socialName: 'Maria Triste',
      email: 'maria@teste.com',
      dateOfBirth: null,
      phoneNumber: '11988888888',
      gender: 'FEMALE',
      uniqueCard: null,
      about: 'Tutor mais reservado',
      cep: null,
      street: null,
      numberHouse: null,
      complement: null,
      neighborhood: null,
      city: null,
      nameEmergencyContact: null,
      phoneNumberEmergency: null,
    })

    const { tutors } = await sut.execute({
      query: 'rex123',
      page: 1,
    })

    expect(tutors).toHaveLength(1)
    expect(tutors).toEqual([expect.objectContaining({ username: 'rex123' })])
  })

  it('should be able to fetch paginated tutor search by username', async () => {
    for (let i = 1; i <= 22; i++) {
      await tutorsRepository.create({
        cpf: `${10000000000 + i}`,
        username: `tutor${i}`,
        socialName: `Tutor Feliz ${i}`,
        email: `tutor${i}@teste.com`,
        dateOfBirth: null,
        phoneNumber: '11999999999',
        gender: 'MALE',
        uniqueCard: null,
        about: 'Tutor feliz',
        cep: null,
        street: null,
        numberHouse: null,
        complement: null,
        neighborhood: null,
        city: null,
        nameEmergencyContact: null,
        phoneNumberEmergency: null,
      })
    }

    const { tutors } = await sut.execute({
      query: 'tutor',
      page: 2,
    })

    expect(tutors).toHaveLength(2)
    expect(tutors).toEqual([
      expect.objectContaining({ username: 'tutor21' }),
      expect.objectContaining({ username: 'tutor22' }),
    ])
  })
})
