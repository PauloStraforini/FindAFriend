import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient, StatsOfEvent } from '@prisma/client'

const prisma = new PrismaClient()

interface CreateEventBody {
  title: string
  description?: string
  statsOfEvent: StatsOfEvent
  latitude: number
  longitude: number
  cep: string
  street: string
  neighborhood: string
  numberHouse?: string
  complement?: string
  authorName?: string
  email?: string
  phone?: string
  acceptedAnimalTypes: string[]
  acceptedSexes: string[]
  excludedBreeds: string[]
  dateOfEvent: Date // ISO string
  startTime: Date // ISO string
  endTime: Date // ISO string
  totalVacancies: number
}

export async function createEvent(
  request: FastifyRequest<{ Body: CreateEventBody }>,
  reply: FastifyReply,
) {
  try {
    const {
      title,
      description,
      statsOfEvent,
      latitude,
      longitude,
      cep,
      street,
      neighborhood,
      numberHouse,
      complement,
      authorName,
      email,
      phone,
      acceptedAnimalTypes,
      acceptedSexes,
      excludedBreeds,
      dateOfEvent,
      startTime,
      endTime,
      totalVacancies,
    } = request.body

    const event = await prisma.event.create({
      data: {
        title,
        description,
        statsOfEvent,
        latitude,
        longitude,
        cep,
        street,
        neighborhood,
        numberHouse,
        complement,
        authorName,
        email,
        phone,
        acceptedAnimalTypes,
        acceptedSexes,
        excludedBreeds,
        dateOfEvent: new Date(dateOfEvent),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        totalVacancies,
        registered: '0', // Começa com 0 inscritos
      },
    })

    return reply.status(201).send(event)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao criar evento' })
  }
}
