import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchPetsUseCase } from './search-pets'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets', async () => {
    await petsRepository.create({
      rga: '123456',
      name: 'Rex Feliz 3',
      dateOfBirth: null,
      age: null,
      castrated: true,
      sex: 'MALE',
      type: 'DOG',
      breed: 'Vira-lata',
      weight: null,
      weightClass: null,
      primaryColor: 'Caramelo',
      about: 'Um dog feliz demais!',
      microchip: null,
      dateOfApplication: null,
      veterinarian: null,
      manufacturerOfMicrochip: null,
      socialName: null,
      origin: null,
      housing: null,
      characteristics: null,
      orgId: 'org-01',
      tutorsId: null,
    })

    await petsRepository.create({
      rga: '654321',
      name: 'Gato Triste',
      dateOfBirth: null,
      age: null,
      castrated: false,
      sex: 'FEMALE',
      type: 'CAT',
      breed: 'Siamês',
      weight: null,
      weightClass: null,
      primaryColor: 'Branco',
      about: 'Um gato mais reservado',
      microchip: null,
      dateOfApplication: null,
      veterinarian: null,
      manufacturerOfMicrochip: null,
      socialName: null,
      origin: null,
      housing: null,
      characteristics: null,
      orgId: 'org-01',
      tutorsId: null,
    })

    const { pets } = await sut.execute({
      query: 'Rex Feliz 3',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Rex Feliz 3' })])
  })

  it('should be able to fetch paginated pet search', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        rga: `${1000 + i}`,
        name: `Pet Feliz ${i}`,
        dateOfBirth: null,
        age: null,
        castrated: true,
        sex: 'MALE',
        type: 'DOG',
        breed: 'SRD',
        weight: null,
        weightClass: null,
        primaryColor: 'Caramelo',
        about: 'Um pet feliz',
        microchip: null,
        dateOfApplication: null,
        veterinarian: null,
        manufacturerOfMicrochip: null,
        socialName: null,
        origin: null,
        housing: null,
        characteristics: null,
        orgId: 'org-01',
        tutorsId: null,
      })
    }

    const { pets } = await sut.execute({
      query: 'Pet Feliz',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Pet Feliz 21' }),
      expect.objectContaining({ name: 'Pet Feliz 22' }),
    ])
  })
})
