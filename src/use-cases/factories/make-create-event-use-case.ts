import { CreateEventUseCase } from '../test/create-event'
import { PrismaEventsRepository } from '../../repositories/prisma/prisma-events-repository'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaEventsRepository()
  const UseCase = new CreateEventUseCase(gymsRepository)

  return UseCase
}
