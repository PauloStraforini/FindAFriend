import { PrismaTutorsRepository } from '../../repositories/prisma/prisma-tutors-repository'
import { SearchTutorsUseCase } from '../test/search-tutors'

export function makeSearchTutorsUseCase() {
  const tutorsRepository = new PrismaTutorsRepository()
  const useCase = new SearchTutorsUseCase(tutorsRepository)

  return useCase
}
