import {
  EventsRepository,
  FindManyNearbyParams,
} from '../../repositories/event-repository'
import { Event, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '../../../utils/get-distance-between-coordinates'

export class InMemoryEventsRepository implements EventsRepository {
  public items: Event[] = []

  async findById(id: string): Promise<Event | null> {
    const event = this.items.find((item) => item.id === id)

    if (!event) {
      return null
    }

    return event
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async deleteById(id: string): Promise<Event | null> {
    const index = this.items.findIndex((item) => item.id === id)
    if (index === -1) {
      return null
    }
    const [deletedEvent] = this.items.splice(index, 1)
    return deletedEvent
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async create(data: Prisma.EventCreateInput) {
    const event = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      statsOfEvent: data.statsOfEvent ?? null,
      cep: data.cep ?? null,
      street: data.street ?? null,
      neighborhood: data.neighborhood ?? null,
      numberHouse: data.numberHouse ?? null,
      complement: data.complement ?? null,
      authorName: data.authorName ?? null,
      email: data.email ?? null,
      phone: data.phone ?? null,
      acceptedAnimalTypes: Array.isArray(data.acceptedAnimalTypes)
        ? data.acceptedAnimalTypes
        : (data.acceptedAnimalTypes?.set ?? []),
      acceptedSexes: Array.isArray(data.acceptedSexes)
        ? data.acceptedSexes
        : (data.acceptedSexes?.set ?? []),
      excludedBreeds: Array.isArray(data.excludedBreeds)
        ? data.excludedBreeds
        : (data.excludedBreeds?.set ?? []),
      dateOfEvent: new Date(data.dateOfEvent),
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      totalVacancies: data.totalVacancies,
      registered: '0',
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(event)

    return event
  }
}
