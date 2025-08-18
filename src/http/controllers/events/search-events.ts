import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeSearchEventsUseCase } from '../../../use-cases/factories/make-search-events-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchEventsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchEventsQuerySchema.parse(request.query)

  const searchEventsUseCase = makeSearchEventsUseCase()

  const { events } = await searchEventsUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    events,
  })
}
