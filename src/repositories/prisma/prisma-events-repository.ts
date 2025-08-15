import { prisma } from '../../lib/prisma'
import { Event, Prisma } from '@prisma/client'
import { FindManyNearbyParams, EventsRepository } from '../event-repository'

export class PrismaEventsRepository implements EventsRepository {
  async findById(id: string) {
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    })

    return event
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const events = await prisma.$queryRaw<Event[]>`
      SELECT * from events
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return events
  }

  async searchMany(query: string, page: number) {
    const events = await prisma.event.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return events
  }

  async create(data: Prisma.EventCreateInput) {
    const event = await prisma.event.create({
      data,
    })

    return event
  }
}
