import { PrismaEventsRepository } from '../../repositories/prisma/prisma-events-repository'
import { SearchEventsUseCase } from '../test/search-events'

export function makeSearchEventsUseCase() {
  const gymsRepository = new PrismaEventsRepository()
  const useCase = new SearchEventsUseCase(gymsRepository)

  return useCase
}
