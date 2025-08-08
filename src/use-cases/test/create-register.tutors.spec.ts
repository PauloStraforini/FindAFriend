import { InMemoryTutorsRepository } from '../../repositories/in-memory/in-memory-tutors-repository'
import { TutorsAlreadyExistsError } from '../errors/tutors-already-exist-error'
import { CreateTutorUseCase } from './create-register.tutors'
import { expect, describe, it } from 'vitest'

describe('Register Pet Use Case', () => {
  it('should be able to register a pet', async () => {
    const tutorsRepository = new InMemoryTutorsRepository()
    const createTutorUseCase = new CreateTutorUseCase(tutorsRepository)

    const { tutor } = await createTutorUseCase.execute({
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

  it('should not be able to register a pet with the same email twice', async () => {
    const petsRepository = new InMemoryTutorsRepository()
    const createTutorUseCase = new CreateTutorUseCase(petsRepository)

    const email = 'joao.silva@example.com'

    await createTutorUseCase.execute({
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
      createTutorUseCase.execute({
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

  it('should not be able to register a pet with the same cpf twice', async () => {
    const petsRepository = new InMemoryTutorsRepository()
    const createPetUseCase = new CreateTutorUseCase(petsRepository)

    const cpf = '12345678901'

    await createPetUseCase.execute({
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
      createPetUseCase.execute({
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

  it('should not be able to register a pet with the same cnpj twice', async () => {
    const petsRepository = new InMemoryTutorsRepository()
    const createPetUseCase = new CreateTutorUseCase(petsRepository)

    const cnpj = ''

    await createPetUseCase.execute({
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
      createPetUseCase.execute({
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

  it('should not be able to register a pet with the same uniqueCard twice', async () => {
    const petsRepository = new InMemoryTutorsRepository()
    const createPetUseCase = new CreateTutorUseCase(petsRepository)

    const uniqueCard = ''

    await createPetUseCase.execute({
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
      createPetUseCase.execute({
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
