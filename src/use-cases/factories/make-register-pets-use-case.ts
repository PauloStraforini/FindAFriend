import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../test/register-pets'

export function makeRegisterPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const registerUseCase = new CreatePetUseCase(petsRepository)

  return registerUseCase
}
