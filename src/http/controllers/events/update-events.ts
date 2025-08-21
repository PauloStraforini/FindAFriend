import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeUpdateEventUseCase } from '../../../use-cases/factories/make-update-event-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  // Schema para validação dos campos do body (sem obrigar o id dentro do payload)
  const updateEventBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().nullable().optional(),
    statsOfEvent: z
      .enum(['PENDING', 'ACTIVE', 'FINISHED', 'CANCELLED'])
      .optional(),
    latitude: z
      .number()
      .refine((value) => Math.abs(value) <= 90)
      .optional(),
    longitude: z
      .number()
      .refine((value) => Math.abs(value) <= 180)
      .optional(),
    cep: z.string().min(8).optional(),
    street: z.string().optional(),
    neighborhood: z.string().optional(),
    numberHouse: z.string().nullable().optional(),
    complement: z.string().nullable().optional(),
    authorName: z.string().optional(),
    email: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    acceptedAnimalTypes: z.array(z.string()).optional(),
    acceptedSexes: z.array(z.string()).optional(),
    excludedBreeds: z.array(z.string()).optional(),
    dateOfEvent: z.coerce.date().optional(),
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
    totalVacancies: z.number().int().optional(),
    registered: z.string().optional(),
  })

  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)
  const data = updateEventBodySchema.parse(request.body)

  try {
    const updateEventUseCase = makeUpdateEventUseCase()
    await updateEventUseCase.execute(id, data)
  } catch (err) {
    return reply.status(400).send({ message: (err as Error).message })
  }

  return reply.status(200).send({ success: true })
}
