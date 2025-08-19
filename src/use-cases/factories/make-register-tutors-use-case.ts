import { PrismaTutorsRepository } from '../../repositories/prisma/prisma-tutors-repository'
import { CreateTutorUseCase } from '../test/create-tutors'

export function makeRegisterTutorsUseCase() {
  const tutorsRepository = new PrismaTutorsRepository()
  const registerUseCase = new CreateTutorUseCase(tutorsRepository)

  return registerUseCase
}
