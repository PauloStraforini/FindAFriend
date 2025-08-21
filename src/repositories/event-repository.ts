import { Event, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface EventsRepository {
  findById(id: string): Promise<Event | null>
  updateById(id: string, data: Prisma.EventUpdateInput): Promise<Event>
  searchMany(query: string, page: number): Promise<Event[]>
  create(data: Prisma.EventCreateInput): Promise<Event>
  findManyNearby(params: FindManyNearbyParams): Promise<Event[]>
  deleteById(id: string): Promise<Event | null>
}
