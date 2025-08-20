import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeSearchTutorsUseCase } from '../../../use-cases/factories/make-search-tutors-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchTutorsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchTutorsQuerySchema.parse(request.query)

  const searchTutorsUseCase = makeSearchTutorsUseCase()

  const { tutors } = await searchTutorsUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    tutors,
  })
}
