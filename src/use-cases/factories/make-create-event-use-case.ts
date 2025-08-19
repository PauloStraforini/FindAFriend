import { CreateEventUseCase } from '../test/create-event'
import { PrismaEventsRepository } from '../../repositories/prisma/prisma-events-repository'

export function makeCreateGymUseCase() {
  const eventsRepository = new PrismaEventsRepository()
  const UseCase = new CreateEventUseCase(eventsRepository)

  return UseCase
}
