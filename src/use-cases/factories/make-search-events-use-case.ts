import { PrismaEventsRepository } from '../../repositories/prisma/prisma-events-repository'
import { SearchEventsUseCase } from '../test/search-events'

export function makeSearchEventsUseCase() {
  const eventsRepository = new PrismaEventsRepository()
  const useCase = new SearchEventsUseCase(eventsRepository)

  return useCase
}
