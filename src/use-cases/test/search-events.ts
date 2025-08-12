import { EventsRepository } from '../../repositories/event-repository'
import { Event } from '@prisma/client'

interface SearchEventsUseCaseRequest {
  query: string
  page: number
}

interface SearchEventsUseCaseResponse {
  events: Event[]
}

export class SearchEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    query,
    page,
  }: SearchEventsUseCaseRequest): Promise<SearchEventsUseCaseResponse> {
    const events = await this.eventsRepository.searchMany(query, page)

    return {
      events,
    }
  }
}
