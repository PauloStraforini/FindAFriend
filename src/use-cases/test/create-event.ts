import { EventsRepository } from '../../repositories/event-repository'
import { Event, StatsOfEvent } from '@prisma/client'

interface CreateEventUseCaseRequest {
  title: string
  name: string
  description?: string | null
  statsOfEvent: StatsOfEvent
  latitude: number
  longitude: number
  cep: string
  street: string
  neighborhood: string
  numberHouse?: string
  complement?: string
  authorName: string
  email?: string | null
  phone?: string | null
  acceptedAnimalTypes: string[]
  acceptedSexes: string[]
  excludedBreeds: string[]
  dateOfEvent: Date
  starTime: Date
  endTime: Date
  totalVacancies: number
  registered: string
}

interface CreateEventUseCaseResponse {
  event: Event
}

export class CreateEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute(
    data: CreateEventUseCaseRequest,
  ): Promise<CreateEventUseCaseResponse> {
    const event = await this.eventsRepository.create({
      title: data.title,
      description: data.description,
      statsOfEvent: data.statsOfEvent,
      latitude: data.latitude,
      longitude: data.longitude,
      cep: data.cep,
      street: data.street,
      neighborhood: data.neighborhood,
      numberHouse: data.numberHouse,
      complement: data.complement,
      authorName: data.authorName,
      email: data.email,
      phone: data.phone,
      acceptedAnimalTypes: data.acceptedAnimalTypes,
      acceptedSexes: data.acceptedSexes,
      excludedBreeds: data.excludedBreeds,
      dateOfEvent: data.dateOfEvent,
      starTime: data.starTime,
      endTime: data.endTime,
      totalVacancies: data.totalVacancies,
      registered: data.registered,
    })

    return { event }
  }
}
