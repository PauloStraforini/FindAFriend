import { expect, describe, it } from 'vitest'
import { CreatePetUseCase } from './register.pets'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { PetAlreadyExistsError } from '../errors/pet-already-exist-error'
import { Decimal } from '@prisma/client/runtime/library'

describe('Register Pet Use Case', () => {
  it('should be able to register a pet', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const createPetUseCase = new CreatePetUseCase(petsRepository)

    const { pet } = await createPetUseCase.execute({
      name: 'Fido',
      rga: 'RGA123456789',
      dateOfBirth: new Date('2018-06-15'),
      age: '5',
      sex: 'MALE',
      type: 'DOG',
      breed: 'Labrador',
      weight: new Decimal(25.3),
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
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toBe('Fido')
  })

  // it('should not be able to register a pet with the same microchip twice', async () => {
  //   const petsRepository = new InMemoryPetsRepository()
  //   const createPetUseCase = new CreatePetUseCase(petsRepository)

  //   const microchip = '123456789012345'

  //   await createPetUseCase.execute({
  //     name: 'Fido',
  //     rga: 'RGA123456789',
  //     dateOfBirth: new Date('2018-06-15'),
  //     age: '5',
  //     sex: 'MALE',
  //     type: 'DOG',
  //     breed: 'Labrador',
  //     weight: new Decimal(25.3),
  //     weightClass: '15-30kg',
  //     primaryColor: 'Amarelo',
  //     about: 'Cachorro amigável e brincalhão',
  //     microchip,
  //     dateOfApplication: new Date('2018-06-20'),
  //     veterinarian: 'Dr. João Silva',
  //     manufacturerOfMicrochip: 'VetChip',
  //     socialName: 'Fidinho',
  //     origin: 'Abrigo Municipal',
  //     housing: 'Casa com quintal',
  //     characteristics: 'Muito ativo e carinhoso',
  //     orgId: '123',
  //   })

  //   await expect(() =>
  //     createPetUseCase.execute({
  //       name: 'Rex',
  //       rga: 'RGA987654321',
  //       dateOfBirth: new Date('2019-03-10'),
  //       age: '4',
  //       sex: 'MALE',
  //       type: 'DOG',
  //       breed: 'Pastor Alemão',
  //       weight: new Decimal(30),
  //       weightClass: '25-35kg',
  //       primaryColor: 'Preto',
  //       about: 'Cachorro protetor',
  //       microchip,
  //       dateOfApplication: new Date('2019-03-15'),
  //       veterinarian: 'Dra. Maria',
  //       manufacturerOfMicrochip: 'VetChip',
  //       socialName: 'Rexinho',
  //       origin: 'Abrigo Municipal',
  //       housing: 'Casa com quintal',
  //       characteristics: 'Calmo e atento',
  //       orgId: '123',
  //     }),
  //   ).rejects.toBeInstanceOf(PetAlreadyExistsError)
  // })

  // it('should not be able to register a pet with the same RGA twice', async () => {
  //   const petsRepository = new InMemoryPetsRepository()
  //   const createPetUseCase = new CreatePetUseCase(petsRepository)

  //   const rga = 'RGA123456789'

  //   await createPetUseCase.execute({
  //     name: 'Fido',
  //     rga,
  //     dateOfBirth: new Date('2018-06-15'),
  //     age: '5',
  //     sex: 'MALE',
  //     type: 'DOG',
  //     breed: 'Labrador',
  //     weight: new Decimal(25.3),
  //     weightClass: '15-30kg',
  //     primaryColor: 'Amarelo',
  //     about: 'Cachorro amigável e brincalhão',
  //     microchip: 'MICROCHIP123',
  //     dateOfApplication: new Date('2018-06-20'),
  //     veterinarian: 'Dr. João Silva',
  //     manufacturerOfMicrochip: 'VetChip',
  //     socialName: 'Fidinho',
  //     origin: 'Abrigo Municipal',
  //     housing: 'Casa com quintal',
  //     characteristics: 'Muito ativo e carinhoso',
  //     orgId: '123',
  //   })

  //   await expect(() =>
  //     createPetUseCase.execute({
  //       name: 'Rex',
  //       rga,
  //       dateOfBirth: new Date('2019-03-10'),
  //       age: '4',
  //       sex: 'MALE',
  //       type: 'DOG',
  //       breed: 'Pastor Alemão',
  //       weight: new Decimal(30),
  //       weightClass: '25-35kg',
  //       primaryColor: 'Preto',
  //       about: 'Cachorro protetor',
  //       microchip: 'MICROCHIP456',
  //       dateOfApplication: new Date('2019-03-15'),
  //       veterinarian: 'Dra. Maria',
  //       manufacturerOfMicrochip: 'VetChip',
  //       socialName: 'Rexinho',
  //       origin: 'Abrigo Municipal',
  //       housing: 'Casa com quintal',
  //       characteristics: 'Calmo e atento',
  //       orgId: '123',
  //     }),
  //   ).rejects.toBeInstanceOf(PetAlreadyExistsError)
  // })
})
