import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { UpdatePetsUseCase } from '../test/update-pets'

export function makeUpdatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new UpdatePetsUseCase(petsRepository)

  return useCase
}
