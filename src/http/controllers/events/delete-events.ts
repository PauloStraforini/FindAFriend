import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { EventNotFoundError } from '../../../use-cases/errors/event-not-found-error'
import { makeDeleteEventsUseCase } from '../../../use-cases/factories/make-delete-event-use-case'

export async function deleted(request: FastifyRequest, reply: FastifyReply) {
  const deleteEventParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteEventParamsSchema.parse(request.params)

  try {
    const deleteEventUseCase = makeDeleteEventsUseCase()

    await deleteEventUseCase.execute({ id })
  } catch (err) {
    if (err instanceof EventNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  console.log(Response.error)

  return reply.status(204).send()
}
