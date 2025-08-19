import { PetsRepository } from '../../repositories/pets-repository'

interface DeletePetUseCaseRequest {
  id: string
}

interface DeletePetUseCaseResponse {
  success: boolean
}

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: DeletePetUseCaseRequest): Promise<DeletePetUseCaseResponse> {
    const eventExists = await this.petsRepository.findById(id)

    if (!eventExists) {
      throw new Error('Event not found')
    }

    await this.petsRepository.deleteById(id)

    return { success: true }
  }
}
