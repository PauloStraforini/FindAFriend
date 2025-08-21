import { PrismaEventsRepository } from '../../repositories/prisma/prisma-events-repository'
import { UpdateEventUseCase } from '../test/update-event'

export function makeUpdateEventUseCase() {
  const eventsRepository = new PrismaEventsRepository()
  const useCase = new UpdateEventUseCase(eventsRepository)

  return useCase
}
