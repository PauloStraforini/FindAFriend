import { Event, Prisma } from '@prisma/client'

export interface EventsRepository {
  findById(id: string): Promise<Event | null>
  create(data: Prisma.EventCreateInput): Promise<Event>
}
