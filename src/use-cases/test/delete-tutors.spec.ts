import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryTutorsRepository } from '../../repositories/in-memory/in-memory-tutors-repository'
import { DeleteTutorUseCase } from './delete-tutors'

let tutorsRepository: InMemoryTutorsRepository
let sut: DeleteTutorUseCase

describe('Delete Tutor Use Case', () => {
  beforeEach(() => {
    tutorsRepository = new InMemoryTutorsRepository()
    sut = new DeleteTutorUseCase(tutorsRepository)
  })

  it('should be able to delete an existing tutor', async () => {
    const tutor = await tutorsRepository.create({
      username: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '123456789',
      cpf: '',
      gender: 'MALE',
    })

    const response = await sut.execute({ id: tutor.id })

    expect(response).toEqual({ success: true })
    expect(await tutorsRepository.findById(tutor.id)).toBeNull()
  })

  it('should throw an error if tutor does not exist', async () => {
    await expect(() => sut.execute({ id: 'non-existent-id' })).rejects.toThrow(
      'Event not found',
    )
  })
})
