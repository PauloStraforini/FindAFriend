import { PrismaEventsRepository } from '../../repositories/prisma/prisma-events-repository'
import { DeleteEventUseCase } from '../test/delete-event'

export function makeDeleteEventsUseCase() {
  const eventsRepository = new PrismaEventsRepository()
  const useCase = new DeleteEventUseCase(eventsRepository)

  return useCase
}
