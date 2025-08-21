import { EventsRepository } from '../../repositories/event-repository'
import { StatsOfEvent } from '@prisma/client'

interface UpdateEventUseCaseRequest {
  title?: string
  description?: string | null
  statsOfEvent?: StatsOfEvent
  latitude?: number
  longitude?: number
  cep?: string
  street?: string
  neighborhood?: string
  numberHouse?: string | null
  complement?: string | null
  authorName?: string | null
  email?: string | null
  phone?: string | null
  acceptedAnimalTypes?: string[]
  acceptedSexes?: string[]
  excludedBreeds?: string[]
  dateOfEvent?: Date
  startTime?: Date
  endTime?: Date
  totalVacancies?: number
  registered?: string
}

interface UpdateEventUseCaseResponse {
  success: boolean
}

export class UpdateEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute(
    id: string,
    updateData: UpdateEventUseCaseRequest,
  ): Promise<UpdateEventUseCaseResponse> {
    const eventExists = await this.eventsRepository.findById(id)

    if (!eventExists) {
      throw new Error('Event not found')
    }

    await this.eventsRepository.updateById(id, updateData)

    return { success: true }
  }
}
