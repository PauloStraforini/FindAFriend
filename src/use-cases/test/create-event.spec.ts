import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEventsRepository } from '../../repositories/in-memory/in-memory-events-repository'
import { CreateEventUseCase } from './create-event'
import { StatsOfEvent } from '@prisma/client'

let eventsRepository: InMemoryEventsRepository
let sut: CreateEventUseCase

describe('Create event Use Case', () => {
  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository()
    sut = new CreateEventUseCase(eventsRepository)
  })

  it('should be able to create event', async () => {
    const { event } = await sut.execute({
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
      starTime: new Date('2025-09-20T09:00:00'),
      endTime: new Date('2025-09-20T17:00:00'),
      totalVacancies: 50,
      registered: '0',
      name: '',
    })

    expect(event.id).toEqual(expect.any(String))
  })
})
