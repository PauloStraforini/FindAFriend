import { EventsRepository } from '../../repositories/event-repository'

interface DeleteEventUseCaseRequest {
  id: string
}

interface DeleteEventUseCaseResponse {
  success: boolean
}

export class DeleteEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    id,
  }: DeleteEventUseCaseRequest): Promise<DeleteEventUseCaseResponse> {
    const eventExists = await this.eventsRepository.findById(id)

    if (!eventExists) {
      throw new Error('Event not found')
    }

    await this.eventsRepository.deleteById(id)

    return { success: true }
  }
}
