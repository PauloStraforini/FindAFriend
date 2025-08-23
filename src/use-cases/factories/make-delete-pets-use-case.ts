import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { DeletePetUseCase } from '../test/delete-pets'

export function makeDeletePetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new DeletePetUseCase(petsRepository)

  return useCase
}
