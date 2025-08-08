import { InMemoryTutorsRepository } from '../../repositories/in-memory/in-memory-tutors-repository'
import { TutorsAlreadyExistsError } from '../errors/tutors-already-exist-error'
import { CreateTutorUseCase } from './create-register-tutors'
import { expect, describe, it, beforeEach } from 'vitest'

let tutorsRepository: InMemoryTutorsRepository
let sut: CreateTutorUseCase

describe('Register tutors Use Case', () => {
  beforeEach(() => {
    tutorsRepository = new InMemoryTutorsRepository()
    sut = new CreateTutorUseCase(tutorsRepository)
  })

  it('should be able to register a tutor', async () => {
    const { tutor } = await sut.execute({
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

    expect(tutor.id).toEqual(expect.any(String))
  })

  it('should not be able to register a tutor with the same email twice', async () => {
    const email = 'joao.silva@example.com'

    await sut.execute({
      username: 'João da Silva',
      cpf: '12345678901',
      email,
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

    await expect(() =>
      sut.execute({
        username: 'João da Silva',
        cpf: '12345678901',
        email,
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
      }),
    ).rejects.toBeInstanceOf(TutorsAlreadyExistsError)
  })

  it('should not be able to register a tutor with the same cpf twice', async () => {
    const cpf = '12345678901'

    await sut.execute({
      username: 'João da Silva',
      cpf,
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

    await expect(() =>
      sut.execute({
        username: 'João da Silva',
        cpf,
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
      }),
    ).rejects.toBeInstanceOf(TutorsAlreadyExistsError)
  })

  it('should not be able to register a tutor with the same cnpj twice', async () => {
    const cnpj = ''

    await sut.execute({
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
      cnpj,
      socialName: '',
      age: '',
      uniqueCard: '',
      complement: '',
      nameEmergencyContact: '',
      phoneNumberEmergency: '',
      pets: '',
    })

    await expect(() =>
      sut.execute({
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
        cnpj,
        socialName: '',
        age: '',
        uniqueCard: '',
        complement: '',
        nameEmergencyContact: '',
        phoneNumberEmergency: '',
        pets: '',
      }),
    ).rejects.toBeInstanceOf(TutorsAlreadyExistsError)
  })

  it('should not be able to register a tutor with the same uniqueCard twice', async () => {
    const uniqueCard = ''

    await sut.execute({
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
      uniqueCard,
      complement: '',
      nameEmergencyContact: '',
      phoneNumberEmergency: '',
      pets: '',
    })

    await expect(() =>
      sut.execute({
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
        uniqueCard,
        complement: '',
        nameEmergencyContact: '',
        phoneNumberEmergency: '',
        pets: '',
      }),
    ).rejects.toBeInstanceOf(TutorsAlreadyExistsError)
  })
})
