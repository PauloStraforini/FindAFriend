import { TutorsRepository } from '../../repositories/tutors-repository'
import { Tutors } from '@prisma/client'

interface SearchTutorsUseCaseRequest {
  query: string
  page: number
}

interface SearchTutorsUseCaseResponse {
  tutors: Tutors[]
}

export class SearchTutorsUseCase {
  constructor(private tutorsRepository: TutorsRepository) {}

  async execute({
    query,
    page,
  }: SearchTutorsUseCaseRequest): Promise<SearchTutorsUseCaseResponse> {
    const tutors = await this.tutorsRepository.searchMany(query, page)

    return {
      tutors,
    }
  }
}
