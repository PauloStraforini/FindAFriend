import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEventsRepository } from '../../repositories/in-memory/in-memory-events-repository'
import { UpdateEventUseCase } from './update-event'
import { CreateEventUseCase } from './create-event'
import { StatsOfEvent } from '@prisma/client'

let eventsRepository: InMemoryEventsRepository
let updateEventUseCase: UpdateEventUseCase
let createEventUseCase: CreateEventUseCase

describe('Update Event Use Case', () => {
  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository()
    updateEventUseCase = new UpdateEventUseCase(eventsRepository)
    createEventUseCase = new CreateEventUseCase(eventsRepository)
  })

  it('should be able to update an event', async () => {
    const { event: createdEvent } = await createEventUseCase.execute({
      title: 'Evento de Adoção: Cães e Gatos',
      description:
        'Um evento especial para encontrar um novo lar para cães e gatos resgatados.',
      latitude: -23.4230695,
      longitude: -47.4256988,
      statsOfEvent: StatsOfEvent.ACTIVE,
      cep: '18080-000',
      street: 'Avenida da Esperança',
      neighborhood: 'Jardim dos Pets',
      authorName: 'ONG Salve uma Vida',
      acceptedAnimalTypes: ['Cachorro', 'Gato'],
      acceptedSexes: ['Macho', 'Femea'],
      excludedBreeds: [],
      dateOfEvent: new Date('2025-09-20T09:00:00'),
      startTime: new Date('2025-09-20T09:00:00'),
      endTime: new Date('2025-09-20T17:00:00'),
      totalVacancies: 50,
      registered: '0',
    })

    const updateResult = await updateEventUseCase.execute(createdEvent.id, {
      title: 'Evento de Adoção Atualizado',
      description: 'Descrição atualizada do evento.',
      statsOfEvent: StatsOfEvent.FINISHED,
      totalVacancies: 100,
    })

    expect(updateResult.success).toBe(true)

    const updatedEvent = await eventsRepository.findById(createdEvent.id)
    expect(updatedEvent?.id).toEqual(createdEvent.id)
    expect(updatedEvent?.title).toBe('Evento de Adoção Atualizado')
    expect(updatedEvent?.description).toBe('Descrição atualizada do evento.')
    expect(updatedEvent?.statsOfEvent).toBe(StatsOfEvent.FINISHED)
    expect(updatedEvent?.totalVacancies).toBe(100)
  })
})
