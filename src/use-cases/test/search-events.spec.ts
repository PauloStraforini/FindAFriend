import { InMemoryEventsRepository } from '../../repositories/in-memory/in-memory-events-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchEventsUseCase } from './search-events'

let eventRepository: InMemoryEventsRepository
let sut: SearchEventsUseCase

describe('Search Event Use Case', () => {
  beforeEach(async () => {
    eventRepository = new InMemoryEventsRepository()
    sut = new SearchEventsUseCase(eventRepository)
  })

  it('should be able to search for events', async () => {
    await eventRepository.create({
      title: 'Evento Feliz 3',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
      statsOfEvent: 'PENDING',
      cep: '',
      street: '',
      neighborhood: '',
      dateOfEvent: '',
      startTime: '',
      endTime: '',
      totalVacancies: 0,
      registered: '',
    })

    await eventRepository.create({
      title: 'Evento Triste',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
      statsOfEvent: 'PENDING',
      cep: '',
      street: '',
      neighborhood: '',
      dateOfEvent: '',
      startTime: '',
      endTime: '',
      totalVacancies: 0,
      registered: '',
    })

    const { events } = await sut.execute({
      query: 'Evento Feliz 3',
      page: 1,
    })

    expect(events).toHaveLength(1)
    expect(events).toEqual([
      expect.objectContaining({ title: 'Evento Feliz 3' }),
    ])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await eventRepository.create({
        title: `Evento Feliz ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
        statsOfEvent: 'PENDING',
        cep: '',
        street: '',
        neighborhood: '',
        dateOfEvent: '',
        startTime: '',
        endTime: '',
        totalVacancies: 0,
        registered: '',
      })
    }

    const { events } = await sut.execute({
      query: 'Evento Feliz',
      page: 2,
    })

    expect(events).toHaveLength(2)
    expect(events).toEqual([
      expect.objectContaining({ title: 'Evento Feliz 21' }),
      expect.objectContaining({ title: 'Evento Feliz 22' }),
    ])
  })
})
