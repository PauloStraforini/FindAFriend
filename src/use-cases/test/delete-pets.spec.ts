import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { DeletePetUseCase } from './delete-pets'

let petsRepository: InMemoryPetsRepository
let sut: DeletePetUseCase

describe('Delete Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new DeletePetUseCase(petsRepository)
  })

  it('should be able to delete an existing pet', async () => {
    const pet = await petsRepository.create({
      name: 'Fido',
      rga: 'RGA123456789',
      dateOfBirth: new Date('2018-06-15'),
      age: '5',
      sex: 'MALE',
      type: 'DOG',
      breed: '',
      about: '',
    })

    const response = await sut.execute({ id: pet.id })

    expect(response).toEqual({ success: true })
    expect(await petsRepository.findById(pet.id)).toBeNull()
  })

  it('should throw an error if pet does not exist', async () => {
    await expect(() => sut.execute({ id: 'non-existent-id' })).rejects.toThrow(
      'Event not found',
    )
  })
})
