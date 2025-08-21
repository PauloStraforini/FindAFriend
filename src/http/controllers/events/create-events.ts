import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { EventAlreadyExistsError } from '../../../use-cases/errors/event-already-exists-error'
import { makeCreateEventUseCase } from '../../../use-cases/factories/make-create-event-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createEventBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    statsOfEvent: z.enum(['PENDING', 'ACTIVE', 'FINISHED', 'CANCELLED']),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    cep: z.string().min(8),
    street: z.string(),
    neighborhood: z.string(),
    numberHouse: z.string().nullable(),
    complement: z.string().nullable(),
    authorName: z.string().optional(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    acceptedAnimalTypes: z.array(z.string()),
    acceptedSexes: z.array(z.string()),
    excludedBreeds: z.array(z.string()),
    dateOfEvent: z.coerce.date(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    totalVacancies: z.int(),
    registered: z.string(),
  })

  const {
    acceptedAnimalTypes,
    acceptedSexes,
    authorName,
    cep,
    complement,
    dateOfEvent,
    description,
    email,
    endTime,
    excludedBreeds,
    latitude,
    longitude,
    neighborhood,
    numberHouse,
    phone,
    registered,
    startTime,
    statsOfEvent,
    street,
    title,
    totalVacancies,
  } = createEventBodySchema.parse(request.body)

  try {
    const createEventUseCase = makeCreateEventUseCase()

    await createEventUseCase.execute({
      acceptedAnimalTypes,
      acceptedSexes,
      authorName,
      cep,
      complement,
      dateOfEvent,
      description,
      email,
      endTime,
      excludedBreeds,
      latitude,
      longitude,
      neighborhood,
      numberHouse,
      phone,
      registered,
      startTime,
      statsOfEvent,
      street,
      title,
      totalVacancies,
    })
  } catch (err) {
    if (err instanceof EventAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
