import { TutorsRepository } from '../../repositories/tutors-repository'

interface DeleteTutorUseCaseRequest {
  id: string
}

interface DeleteTutorUseCaseResponse {
  success: boolean
}

export class DeleteTutorUseCase {
  constructor(private tutorsRepository: TutorsRepository) {}

  async execute({
    id,
  }: DeleteTutorUseCaseRequest): Promise<DeleteTutorUseCaseResponse> {
    const tutorExists = await this.tutorsRepository.findById(id)

    if (!tutorExists) {
      throw new Error('Event not found')
    }

    await this.tutorsRepository.deleteById(id)

    return { success: true }
  }
}
