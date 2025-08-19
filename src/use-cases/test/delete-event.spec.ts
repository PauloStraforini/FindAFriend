import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEventsRepository } from '../../repositories/in-memory/in-memory-events-repository'
import { DeleteEventUseCase } from './delete-event'

let eventsRepository: InMemoryEventsRepository
let sut: DeleteEventUseCase

describe('Delete Event Use Case', () => {
  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository()
    sut = new DeleteEventUseCase(eventsRepository)
  })

  it('should be able to delete an existing event', async () => {
    const event = await eventsRepository.create({
      title: 'Evento Teste',
      description: 'Descrição do evento',
      statsOfEvent: 'ACTIVE',
      latitude: 0,
      longitude: 0,
      cep: '00000000',
      street: 'Rua Teste',
      neighborhood: 'Bairro Teste',
      dateOfEvent: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      totalVacancies: 10,
      registered: '0',
      acceptedAnimalTypes: ['DOG'],
      acceptedSexes: ['MALE'],
      excludedBreeds: [],
    })

    const response = await sut.execute({ id: event.id })

    expect(response).toEqual({ success: true })
    expect(await eventsRepository.findById(event.id)).toBeNull()
  })

  it('should throw an error if event does not exist', async () => {
    await expect(() => sut.execute({ id: 'non-existent-id' })).rejects.toThrow(
      'Event not found',
    )
  })
})
