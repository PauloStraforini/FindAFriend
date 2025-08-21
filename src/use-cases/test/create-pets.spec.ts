import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pets'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { PetAlreadyExistsError } from '../errors/pet-already-exist-error'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Fido',
      rga: 'RGA123456789',
      dateOfBirth: new Date('2018-06-15'),
      age: '5',
      sex: 'MALE',
      type: 'DOG',
      breed: 'Labrador',
      weight: 20,

      weightClass: '15-30kg',
      primaryColor: 'Amarelo',
      about: 'Cachorro amigável e brincalhão',
      microchip: 'MICROCHIP123',
      dateOfApplication: new Date('2018-06-20'),
      veterinarian: 'Dr. João Silva',
      manufacturerOfMicrochip: 'VetChip',
      socialName: 'Fidinho',
      origin: 'Abrigo Municipal',
      housing: 'Casa com quintal',
      characteristics: 'Muito ativo e carinhoso',
      orgId: '123',
      tutorsId: 'tutor-id-uuid-aqui',
      castrated: false,
      nameEmergencyContact: '',
      phoneNumberEmergency: '',
      cep: '',
      street: '',
      numberHouse: '',
      neighborhood: '',
      city: '',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toBe('Fido')
  })

  it('should not be able to register a pet with the same RGA twice', async () => {
    const rga = 'RGA123456789'

    await sut.execute({
      name: 'Fido',
      rga,
      dateOfBirth: new Date('2018-06-15'),
      age: '5',
      sex: 'MALE',
      type: 'DOG',
      breed: 'Labrador',
      weight: 20,

      weightClass: '15-30kg',
      primaryColor: 'Amarelo',
      about: 'Cachorro amigável e brincalhão',
      microchip: 'MICROCHIP123',
      dateOfApplication: new Date('2018-06-20'),
      veterinarian: 'Dr. João Silva',
      manufacturerOfMicrochip: 'VetChip',
      socialName: 'Fidinho',
      origin: 'Abrigo Municipal',
      housing: 'Casa com quintal',
      characteristics: 'Muito ativo e carinhoso',
      orgId: '12345678',
      castrated: false,
      nameEmergencyContact: '',
      phoneNumberEmergency: '',
      cep: '',
      street: '',
      numberHouse: '',
      neighborhood: '',
      city: '',
    })

    await expect(() =>
      sut.execute({
        name: 'Rex',
        rga,
        dateOfBirth: new Date('2019-03-10'),
        age: '4',
        sex: 'MALE',
        type: 'DOG',
        breed: 'Pastor Alemão',
        weight: 20,
        weightClass: '25-35kg',
        primaryColor: 'Preto',
        about: 'Cachorro protetor',
        microchip: 'MICROCHIP456',
        dateOfApplication: new Date('2019-03-15'),
        veterinarian: 'Dra. Maria',
        manufacturerOfMicrochip: 'VetChip',
        socialName: 'Rexinho',
        origin: 'Abrigo Municipal',
        housing: 'Casa com quintal',
        characteristics: 'Calmo e atento',
        orgId: '12345678',
        castrated: false,
        nameEmergencyContact: '',
        phoneNumberEmergency: '',
        cep: '',
        street: '',
        numberHouse: '',
        neighborhood: '',
        city: '',
      }),
    ).rejects.toBeInstanceOf(PetAlreadyExistsError)
  })

  it('should not be able to register a pet with the same RGA twice', async () => {
    const rga = 'RGA123456789'

    await sut.execute({
      name: 'Fido',
      rga,
      dateOfBirth: new Date('2018-06-15'),
      age: '5',
      sex: 'MALE',
      type: 'DOG',
      breed: 'Labrador',
      weight: 20,
      weightClass: '15-30kg',
      primaryColor: 'Amarelo',
      about: 'Cachorro amigável e brincalhão',
      microchip: 'MICROCHIP123',
      dateOfApplication: new Date('2018-06-20'),
      veterinarian: 'Dr. João Silva',
      manufacturerOfMicrochip: 'VetChip',
      socialName: 'Fidinho',
      origin: 'Abrigo Municipal',
      housing: 'Casa com quintal',
      characteristics: 'Muito ativo e carinhoso',
      orgId: '123',
      castrated: false,
      nameEmergencyContact: '',
      phoneNumberEmergency: '',
      cep: '',
      street: '',
      numberHouse: '',
      neighborhood: '',
      city: '',
    })

    await expect(() =>
      sut.execute({
        name: 'Rex',
        rga,
        dateOfBirth: new Date('2019-03-10'),
        age: '4',
        sex: 'MALE',
        type: 'DOG',
        breed: 'Pastor Alemão',
        weight: 20,
        weightClass: '25-35kg',
        primaryColor: 'Preto',
        about: 'Cachorro protetor',
        microchip: 'MICROCHIP456',
        dateOfApplication: new Date('2019-03-15'),
        veterinarian: 'Dra. Maria',
        manufacturerOfMicrochip: 'VetChip',
        socialName: 'Rexinho',
        origin: 'Abrigo Municipal',
        housing: 'Casa com quintal',
        characteristics: 'Calmo e atento',
        orgId: '123',
        castrated: false,
        nameEmergencyContact: '',
        phoneNumberEmergency: '',
        cep: '',
        street: '',
        numberHouse: '',
        neighborhood: '',
        city: '',
      }),
    ).rejects.toBeInstanceOf(PetAlreadyExistsError)
  })
})
