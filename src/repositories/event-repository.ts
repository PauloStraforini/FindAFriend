import { Event, Prisma } from '@prisma/client'

export interface EventsRepository {
  findById(id: string): Promise<Event | null>
  searchMany(query: string, page: number): Promise<Event[]>
  create(data: Prisma.EventCreateInput): Promise<Event>
}
