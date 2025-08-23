import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { EventNotFoundError } from '../../../use-cases/errors/event-not-found-error'
import { makeUpdateEventUseCase } from '../../../use-cases/factories/make-update-event-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateEventParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updateEventBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    statsOfEvent: z
      .enum(['PENDING', 'ACTIVE', 'FINISHED', 'CANCELLED'])
      .optional(),
    latitude: z
      .number()
      .refine((v) => Math.abs(v) <= 90)
      .optional(),
    longitude: z
      .number()
      .refine((v) => Math.abs(v) <= 180)
      .optional(),
    cep: z.string().min(8).optional(),
    street: z.string().optional(),
    neighborhood: z.string().optional(),
    numberHouse: z.string().optional(),
    complement: z.string().optional(),
    authorName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    acceptedAnimalTypes: z.array(z.string()).optional(),
    acceptedSexes: z.array(z.string()).optional(),
    excludedBreeds: z.array(z.string()).optional(),
    dateOfEvent: z.coerce.date().optional(),
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
    totalVacancies: z.number().int().optional(),
    registered: z.string().optional(),
  })

  const { id } = updateEventParamsSchema.parse(request.params)
  const updateData = updateEventBodySchema.parse(request.body)

  try {
    const updateEventUseCase = makeUpdateEventUseCase()
    const updatedEvent = await updateEventUseCase.execute(id, updateData)

    return reply.status(200).send(updatedEvent)
  } catch (err) {
    if (err instanceof EventNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    console.error(err)
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
